package com.bh.demo.service.impl;

import com.bh.common.service.BaseService;
import com.bh.demo.dao.ProductMapper;
import com.bh.demo.model.Product;
import com.bh.demo.service.IProductService;
import org.springframework.stereotype.Service;

/**
 * Created by sam on 2017/11/24.
 */
@Service
public class ProductService extends BaseService<Product,ProductMapper> implements IProductService {

    @Override
    public Product selectByCode(String code) {
        return this.mapper.selectByCode(code);
    }

    @Override
    public Integer selectMaxId() {
        return this.mapper.selectMaxId();
    }

}
