package com.bh.demo.service;

import com.bh.common.service.IBaseService;
import com.bh.demo.dao.ProductMapper;
import com.bh.demo.model.Product;

/**
 * Created by sam on 2017/11/24.
 */
public interface IProductService extends IBaseService<Product,ProductMapper> {
    Product selectByCode(String code);
    Integer selectMaxId();
}
