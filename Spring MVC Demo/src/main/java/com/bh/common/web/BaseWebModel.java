package com.bh.common.web;

/**
 * Created by song on 2017/7/15.
 */
public class BaseWebModel {
    private String queryJsonStr = "";
    private int pageSize = 10;
    private int pageNow = 1;
    private String sortString;
    public String getSortString() {
        return sortString;
    }
    public void  setSortString(String sortString) {
        this.sortString = sortString;
    }
    public String getQueryJsonStr() {
        return queryJsonStr;
    }
    public void  setQueryJsonStr(String queryJsonStr) {
        this.queryJsonStr = queryJsonStr;
    }
    public int getPageSize() {
        return pageSize;
    }
    public void  setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    public int getPageNow() {
        return pageNow;
    }
    public void  setPageNow(int pageNow) {
        this.pageNow = pageNow;
    }
}
