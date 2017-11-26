package com.bh.common.exception;


import com.bh.common.result.OperationResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class SpringExceptionResolver implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        String url = request.getRequestURL().toString();
        ModelAndView mv;
        String defaultMsg = "System error";
        OperationResult result = OperationResult.OK();
        // 这里我们要求项目中所有请求json数据，都使用.json结尾
        if (url.endsWith(".json")) {
            if (ex instanceof PermissionException || ex instanceof ParamException) {
                result.error(ex);
                mv = new ModelAndView("jsonView", result.toMap());
            } else {
                result.error(ex);
                mv = new ModelAndView("jsonView", result.toMap());
            }
        } else if (url.endsWith(".page")){ // 这里我们要求项目中所有请求page页面，都使用.page结尾
            result.error(ex);
            mv = new ModelAndView("exception", result.toMap());
        } else {
            result.error(ex);
            mv = new ModelAndView("jsonView", result.toMap());
        }
        return mv;
    }
}
