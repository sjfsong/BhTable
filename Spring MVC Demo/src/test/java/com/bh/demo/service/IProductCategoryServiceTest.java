package com.bh.demo.service;

import com.bh.demo.model.Product;
import com.bh.demo.model.ProductCategory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;

import static org.junit.Assert.*;

/**
 * Created by sam on 2017/11/24.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class IProductCategoryServiceTest {
    @Autowired
    private IProductCategoryService service;

    @Autowired
    protected IProductService productService;

    @Test
    public void insert() throws Exception {
        ProductCategory productCategory = new ProductCategory();
        productCategory.setCode("mac");
        productCategory.setName("IPhone");
        productCategory.setDescription("苹果公司的产品");
        this.service.insert(productCategory);
    }

    @Test
    public void insertProduct() throws Exception {
        for (int i=1;i<100;i++){
            int  randomKey = (int)(Math.random()*90+10);
            Product product = new Product();
            product.setName("Iphone " + randomKey + "代");
            product.setCode("iphone" + randomKey);
            product.setCategoryCode("mac");
            product.setDescription("苹果第"+ randomKey + "代，东西不错啊，就是太贵");
            product.setPrice(BigDecimal.valueOf(Math.random()*i));
            product.setQty(Integer.valueOf((int)(Math.random()*90+10))*i);
            this.productService.insert(product);
        }
    }
}