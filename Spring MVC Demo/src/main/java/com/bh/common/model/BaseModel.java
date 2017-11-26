package com.bh.common.model;

import com.bh.common.util.DateUtil;
import com.bh.common.util.StrUtil;

import java.lang.reflect.Field;
import java.util.Date;


/**
 *
 */
public class BaseModel {
    private String keyField;
    private static final long serialVersionUID = -665036712667731957L;

    /**
     * 排序字段
     */
    private String sortString;

    private Date createTime;

    private Date updateTime;

    public String getSortString() {
        return sortString;
    }

    public void setSortString(String sortString) {
        this.sortString = sortString;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getKeyField() {
        if (StrUtil.isBlankOrNull(this.keyField)) {
            for (Field field : this.getClass().getDeclaredFields()) {
                if (field.isAnnotationPresent(KeyField.class)) {
                    this.keyField = field.getName();
                }
            }
        }
        return keyField;
    }

    public int getKeyValue() {
        try {
            if (StrUtil.isBlankOrNull(this.getKeyField())) {
                return -999999;
            }
            Field field = this.getClass().getDeclaredField(this.getKeyField());
            field.setAccessible(true); //设置些属性是可以访问的
            String keyStr = field.get(this).toString();
            if (StrUtil.isBlankOrNull(keyStr)) {
                return -999999;
            } else {
                return Integer.valueOf(keyStr);
            }
        } catch (Exception ex) {
            return -999999;
        }
    }

    @Override
    public String toString() {
        try {
            Field[] fs = this.getClass().getDeclaredFields();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < fs.length; i++) {
                Field f = fs[i];
                f.setAccessible(true); //设置些属性是可以访问的
                if (null != f.get(this)) {
                    sb.append(f.getName());
                    sb.append(":");
                    sb.append(f.get(this).toString());
                    sb.append("\n");
                }
            }
            return sb.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return super.toString();
        }
    }

    public void SetTextValue(int value) {
        try {
            Field[] fs = this.getClass().getDeclaredFields();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < fs.length; i++) {
                Field f = fs[i];
                f.setAccessible(true); //设置些属性是可以访问的
                String type = f.getType().toString();//得到此属性的类型
                if (type.endsWith("String")) {
                    f.set(this, f.getName() + String.valueOf(value));        //给属性设值
                } else if (type.endsWith("int") || type.endsWith("Integer")) {
                    f.set(this, i);
                } else if (type.endsWith("int") || type.endsWith("Integer")) {
                    f.set(this, i);
                } else if (type.endsWith("Long")) {
                    f.set(this, Long.valueOf(i));
                } else if (type.endsWith("Date")) {
                    f.set(this, DateUtil.getCurrDate());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
