package me.twhuang.dogchat.controller;

import com.alibaba.fastjson.JSON;
import lombok.AllArgsConstructor;
import me.twhuang.dogchat.entity.User;
import me.twhuang.dogchat.mapper.UserMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Description: TODO
 * @Date: 2021-04-27 17:03
 * @Author: tw.huang
 * @Version: v1.0.0
 **/
@RestController
@AllArgsConstructor
public class DemoController {

    private UserMapper userMapper;

    @GetMapping("/")
    public String demo() {
        List<User> users = userMapper.selectList(null);
        return JSON.toJSONString(users);
    }
}
