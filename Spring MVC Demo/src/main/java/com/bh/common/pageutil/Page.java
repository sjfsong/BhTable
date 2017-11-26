package com.bh.common.pageutil;
/**
 * Created by song on 2017/7/15.
 */
public class Page<E> implements java.io.Serializable{
	
	private int pageSize = 20;
	private int pageNow;
	private String sort;

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNow() {
		return pageNow;
	}

	public void setPageNow(int pageNow) {
		this.pageNow = pageNow;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	@Override
	public String toString() {
		return String.format("pageSize:{%d},page,:{%d},sort:{%s}",this.getPageSize(),this.getPageNow(),this.getSort());
	}
}