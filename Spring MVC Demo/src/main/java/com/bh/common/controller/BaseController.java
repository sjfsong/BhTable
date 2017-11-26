package com.bh.common.controller;


import com.bh.common.model.BaseModel;
import com.bh.common.model.Ids;
import com.bh.common.pageutil.Page;
import com.bh.common.result.OperationResult;
import com.bh.common.service.IBaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @param <T>
 * @param <S>
 */
public abstract class BaseController<T extends BaseModel,S extends IBaseService>{
    protected Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    public S service;

    @ResponseBody
    @RequestMapping(value = "/listByPage")
    public OperationResult listByPage(T T, Page page) {
        OperationResult result = OperationResult.OK();
        try{
            result.setData(this.service.listByPage(T,page));
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return result;
    }
    @ResponseBody
    @RequestMapping(value = "/deleteByKeys")
    public OperationResult deleteByPrimaryKeys(Ids ids) {
        OperationResult result = OperationResult.OK();
        try{
            String[] id = ids.getData().split(",");
            this.service.deleteByPrimaryKeys(id);
        } catch (Exception ex){
            result.error(ex);
            ex.printStackTrace();
        }
        return result;
    }
}
