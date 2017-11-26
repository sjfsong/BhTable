package com.bh.common.service;

import com.bh.common.util.DateUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.bh.common.mapper.IBaseMapper;
import com.bh.common.model.BaseModel;
import com.bh.common.pageutil.Page;
import com.bh.common.util.StrUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Service基库
 * @param <T>
 * @param <M>
 */
public abstract class BaseService<T extends BaseModel,M extends IBaseMapper<T>> implements IBaseService<T,M> {

    @Autowired
    protected M mapper;

    /**
     * 插入数据
     * @param t
     * @return
     * @throws Exception
     */
    @Override
    public T insert(T t) throws Exception{
        if (t == null) {
            return null;
        }
        t.setCreateTime(DateUtil.getCurrDate());
        t.setUpdateTime(DateUtil.getCurrDate());
        mapper.insert(t);
        return t;
    }

    /**
     * 更新数据
     * @param t
     * @return
     * @throws Exception
     */
    @Override
    public T update(T t) throws Exception{
        t.setUpdateTime(DateUtil.getCurrDate());
        mapper.update(t);
        return t;

    }

    /**
     * 批量删除数据
     * @param id
     */
    @Override
    public void deleteByPrimaryKeys (String[] id){
        mapper.deleteByPrimaryKeys(id);
    }

    /**
     * 分压查询
     * @param T 查询条件
     * @param page 分页信息
     * @return
     */
    public PageInfo listByPage(T T, Page page){
        System.out.println(T.toString());
        PageHelper.startPage(page.getPageNow(),page.getPageSize());
        if(!StrUtil.isBlankOrNull(page.getSort())){
            T.setSortString(page.getSort());
        }
        System.out.println(T.toString());
        List<T> list = mapper.listByPage(T);
        // 取分页信息
        PageInfo<T> pageInfo = new PageInfo<T>(list);
        return pageInfo;
    }

}
