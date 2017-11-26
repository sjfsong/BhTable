package com.bh.demo.service.impl;

import com.bh.common.service.BaseService;
import com.bh.demo.dao.ProductCategoryMapper;
import com.bh.demo.model.ProductCategory;
import com.bh.demo.service.IProductCategoryService;
import org.springframework.stereotype.Service;

/**
 * Created by sam on 2017/11/24.
 */
@Service
public class ProductCategoryService extends BaseService<ProductCategory,ProductCategoryMapper> implements IProductCategoryService {
}
