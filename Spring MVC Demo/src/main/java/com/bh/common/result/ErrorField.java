package com.bh.common.result;

import java.io.Serializable;

/**
 * Created by song on 2017/9/14.
 */
public class ErrorField implements Serializable {
    private String fieldName;
    private String message;

    public ErrorField(String fieldName, String message) {
        this.fieldName = fieldName;
        this.message = message;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
