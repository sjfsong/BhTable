package com.bh.demo.dao;

import com.bh.common.mapper.IBaseMapper;
import com.bh.demo.model.Product;

public interface ProductMapper extends IBaseMapper<Product> {
      Product selectByCode(String name);
      Integer selectMaxId();
}