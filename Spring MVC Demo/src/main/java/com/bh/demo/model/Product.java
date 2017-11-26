package com.bh.demo.model;

import com.bh.common.model.BaseModel;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class Product extends BaseModel {
    private Integer id;

    @Length(max = 10, message = "编码最长10位")
    @NotNull(message = "编码不能为空")
    @NotBlank(message = "编码不能为空")
    private String code;

    @NotNull(message = "类别不能为空")
    @NotBlank(message = "类别不能为空")
    private String categoryCode;

    @NotNull(message = "名称不能为空")
    @NotBlank(message = "名称不能为空")
    @Length(max = 40, message = "名称最长40位")
    private String name;
    @NotNull(message = "单价不能为空")
    private BigDecimal price;
    @NotNull(message = "数量不能为空")
    private Integer qty;

    private String description;

    private String categoryName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode == null ? null : categoryCode.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}