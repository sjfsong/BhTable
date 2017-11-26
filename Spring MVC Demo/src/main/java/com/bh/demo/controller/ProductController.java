package com.bh.demo.controller;

import com.bh.common.controller.BaseController;
import com.bh.common.model.Ids;
import com.bh.common.result.OperationResult;
import com.bh.demo.model.Product;
import com.bh.demo.model.ProductCategory;
import com.bh.demo.service.IProductCategoryService;
import com.bh.demo.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sam on 2017/11/24.
 */
@Controller
@RequestMapping("/")
public class ProductController extends BaseController<Product,IProductService> {

    @Autowired
    public IProductCategoryService productCategoryService;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String list(){
        return "product/simp";
    }
    @RequestMapping(value = "/simp",method = RequestMethod.GET)
    public String simp(){
        return "product/simp";
    }
    @RequestMapping(value = "/basic",method = RequestMethod.GET)
    public String basic(){
        return "product/basic";
    }
    @RequestMapping(value = "/crud",method = RequestMethod.GET)
    public String crud(){
        return "product/crud";
    }
    @RequestMapping(value = "/batchCreateData",method = RequestMethod.POST)
    @ResponseBody
    public OperationResult batchCreateData(){
        OperationResult result = OperationResult.OK();
        try {
            Integer maxId = this.service.selectMaxId() + 1;
            for (int i = maxId; i < maxId + 100; i++) {
                int randomKey = (int) (Math.random() * 90 + 10);
                Product product = new Product();
                product.setName("Iphone " + randomKey + "代");
                product.setCode("iphone" + String.valueOf(i));
                product.setCategoryCode("apple");
                product.setDescription("苹果第" + randomKey + "代，东西不错啊，就是太贵");
                product.setPrice(BigDecimal.valueOf(Math.random() * i));
                product.setQty(Integer.valueOf((int) (Math.random() * 90 + 10)) * i);
                this.service.insert(product);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            result.error(ex);
        }
        return result;
    }
    @ResponseBody
    @RequestMapping(value = "/saveProduct",method = RequestMethod.POST)
    public OperationResult saveProduct(@Valid Product product, BindingResult bindingResult){
        OperationResult result = OperationResult.OK();
        if(bindingResult.hasErrors()){
            return result.bindingError(bindingResult);
        }
        try{
            //检查用户名是否存在
            Product oldProduct = this.service.selectByCode(product.getCode());
            if(oldProduct != null && !oldProduct.getId().equals(product.getId())){
                result.addErrorField("code","代码已经存在");
                return result;
            }
            if(product.getId() != null && product.getId()>0){
                this.service.update(product);
            }else {
                this.service.insert(product);
            }
            result.setData(product);
        }catch (Exception ex){
            ex.printStackTrace();
            result.error(ex);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/getCategory",method = RequestMethod.GET)
    public OperationResult getCategory(){
        OperationResult result = OperationResult.OK();


        try {
            {
                ProductCategory productCategory = new ProductCategory();
                productCategory.setName("小米");
                productCategory.setCode("xiaomi");
                this.productCategoryService.insert(productCategory);
            }
            {
                ProductCategory productCategory = new ProductCategory();
                productCategory.setName("苹果");
                productCategory.setCode("apple");
                this.productCategoryService.insert(productCategory);
            }
            {
                ProductCategory productCategory = new ProductCategory();
                productCategory.setName("华为");
                productCategory.setCode("huawei");
                this.productCategoryService.insert(productCategory);
            }
            {
                ProductCategory productCategory = new ProductCategory();
                productCategory.setName("联想");
                productCategory.setCode("lenovo");
                this.productCategoryService.insert(productCategory);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            result.error(ex);
        }
        return result;
    }
}
