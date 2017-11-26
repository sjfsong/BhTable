package com.bh.common.result;

import com.bh.common.exception.BhException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 返回结果
 */
public class OperationResult {
    public static final String BINDINGRESULT_ERROR_MESSAGEID = "E000001";
    private Boolean success;
    private String messageId;
    private Object data;
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public OperationResult()
    {
        this.success = true;
    }

    public Boolean getSuccess() {
        return success;
    }

    public OperationResult setSuccess(Boolean success) {
        this.success = success;
        return this;
    }

    public static OperationResult OK(){
        return new OperationResult(true,"1");
    }

    public OperationResult error(String message){
        this.success = false;
        this.setMessage(message);
        return this;
    }
    public OperationResult error(Exception ex){
        this.success = false;
        if(!ex.getClass().getName().equals(BhException.class)){
            this.setMessageId("-1");
        }
        this.setMessage(ex.getMessage());
        return this;
    }
    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
    public OperationResult bindingError(BindingResult bindingResult){
        Map<String, String> err = null;
        if(this.getData() == null){
            err = new HashMap<String, String>();
            this.setData(err);
        }else{
            err = ( HashMap<String, String>)this.getData();
        }
        List<FieldError> list = bindingResult.getFieldErrors();
        FieldError error = null;
        for (int i = 0; i < list.size(); i++) {
            error = list.get(i);
            err.put(error.getField(), error.getDefaultMessage());
        }
        this.setMessageId(BINDINGRESULT_ERROR_MESSAGEID);
        this.setData(err);
        this.setSuccess(false);
        return this;
    }
    public OperationResult addErrorField(String fieldName,String errorMessage){
        Map<String, String> err = null;
        if(this.getData() == null){
            err = new HashMap<String, String>();
            this.setData(err);
        }else{
            err = ( HashMap<String, String>)this.getData();
        }
        err.put(fieldName,errorMessage);
        this.setMessageId(BINDINGRESULT_ERROR_MESSAGEID);
        this.setSuccess(false);
        return this;
    }
    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public OperationResult(Boolean success, String messageId) {
        this.success = success;
        this.messageId = messageId;
    }
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<String, Object>();
        result.put("data", this);
        return result;
    }
}
