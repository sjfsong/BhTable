package com.bh.common.web;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;

import java.sql.Timestamp;

/**
 * Timestamp日期类型转换
 * @author julong
 * @date 2016-7-13 上午09:47:20
 */
public class TimestampConverter implements Converter<String,Timestamp>{

    @Override
    public Timestamp convert(String arg0) {
        // TODO Auto-generated method stub
        if(StringUtils.isNotEmpty(arg0.trim())){
            Timestamp timestamp = Timestamp.valueOf(arg0);
            return timestamp;
        }
        return null;

    }

}