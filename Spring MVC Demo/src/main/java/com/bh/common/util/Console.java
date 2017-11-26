package com.bh.common.util;


import com.bh.common.result.OperationResult;

/**
 * Created by song on 2017/8/19.
 */
public class Console {
    public static void  WriteLine(Object object){
        System.out.println("*****************************************************************************************************");
        System.out.println(object);
        System.out.println("*****************************************************************************************************");
    }
    public static void  WriteLine(OperationResult result){
        System.out.println("*****************************************************************************************************");
        System.out.println("Success:" + result.getSuccess());
        System.out.println("Message:" + result.getMessage());
        System.out.println("Data:" + result.getData());
        System.out.println("*****************************************************************************************************");
    }
}
