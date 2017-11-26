package com.bh.common.mapper;

import java.util.List;

import com.bh.common.model.BaseModel;

/**
 * dao基类
 * @param <T>
 */
public interface IBaseMapper<T extends BaseModel> {

    /**
     * 增加数据
     * @param t
     */
    void insert(T t);

    /**
     * 批量增加
     * @param list
     */
    void batchSave(List<T> list);

    /**
     * 修改数据
     * @param t
     * @return
     */
    int update(T t);

    /**
     * 分页查询
     * @param T
     * @return
     */
    List<T> listByPage(T T);

    /**
     * 批量删除数据
     * @param id
     */
    void deleteByPrimaryKeys(String[] id);
}
