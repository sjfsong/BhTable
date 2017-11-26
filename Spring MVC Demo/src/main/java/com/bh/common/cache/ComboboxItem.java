package com.bh.common.cache;

import java.io.Serializable;

/**
 * Created by song on 2017/8/20.
 */
public class ComboboxItem implements Serializable {
    private String selected;
    private String value;
    private String text;

    public ComboboxItem() {
        this.selected = "N";
    }

    public ComboboxItem(String value, String text) {
        this.value = value;
        this.text = text;
        this.selected = "N";
    }

    public ComboboxItem(String selected, String value, String text) {
        this.selected = selected;
        this.value = value;
        this.text = text;
    }

    public String getSelected() {
        return selected;
    }

    public void  setSelected(String selected) {
        this.selected = selected;
    }

    public String getValue() {
        return value;
    }

    public void  setValue(String value) {
        this.value = value;
    }

    public String getText() {
        return text;
    }

    public void  setText(String text) {
        this.text = text;
    }
}
