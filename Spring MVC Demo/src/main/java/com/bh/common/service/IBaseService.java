package com.bh.common.service;


import com.github.pagehelper.PageInfo;
import com.bh.common.mapper.IBaseMapper;
import com.bh.common.model.BaseModel;
import com.bh.common.pageutil.Page;
/**
 * Service基类
 * @param <T>
 * @param <M>
 */
public interface IBaseService<T extends BaseModel,M extends IBaseMapper<T>> {

    /**
     * 插入数据
     * @param t
     * @return
     * @throws Exception
     */
    T insert(T t) throws Exception;


    /**
     * 更新数据
     * @param t
     * @return
     * @throws Exception
     */
    T update(T t) throws Exception;

    /**
     * 分页查询
     * @param T
     * @param page
     * @return
     */
    PageInfo<T> listByPage(T T, Page page);

    /**
     * 根据主键删除数据
     * @param id
     */
    void deleteByPrimaryKeys(String[] id);
}
