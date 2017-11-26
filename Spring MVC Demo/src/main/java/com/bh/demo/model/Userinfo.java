package com.bh.demo.model;

import com.bh.common.model.BaseModel;

import java.util.Date;

public class Userinfo extends BaseModel {
    private Integer id;

    private String userName;

    private String password;

    private String name;

    private String description;

    private Date lastLoginTime;

    private String lastLoginId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public String getLastLoginId() {
        return lastLoginId;
    }

    public void setLastLoginId(String lastLoginId) {
        this.lastLoginId = lastLoginId == null ? null : lastLoginId.trim();
    }
}