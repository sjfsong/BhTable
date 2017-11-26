package com.bh.common.cache;

/**
 * Created by song on 2017/8/20.
 */
public class TableCacheData {
    private String tableName;
    private String idField;
    private String txtField;
    private String name;

    public TableCacheData(String tableName, String idField, String txtField,String name) {
        this.tableName = tableName;
        this.idField = idField;
        this.txtField = txtField;
        this.name = name;

    }

    public String getTableName() {
        return tableName;
    }

    public void  setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getIdField() {
        return idField;
    }

    public void  setIdField(String idField) {
        this.idField = idField;
    }

    public String getTxtField() {
        return txtField;
    }

    public void  setTxtField(String txtField) {
        this.txtField = txtField;
    }

    public String getName() {
        return name;
    }

    public void  setName(String name) {
        this.name = name;
    }
}
