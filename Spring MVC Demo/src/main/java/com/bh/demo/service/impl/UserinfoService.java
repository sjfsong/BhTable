package com.bh.demo.service.impl;

import com.bh.common.service.BaseService;
import com.bh.common.service.IBaseService;
import com.bh.demo.dao.UserinfoMapper;
import com.bh.demo.model.Userinfo;
import com.bh.demo.service.IUserinfoService;
import org.springframework.stereotype.Service;

/**
 * Created by sam on 2017/11/24.
 */
@Service
public class UserinfoService extends BaseService<Userinfo,UserinfoMapper> implements IUserinfoService {
}
