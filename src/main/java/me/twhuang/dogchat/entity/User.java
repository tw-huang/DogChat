package me.twhuang.dogchat.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @Description: user
 * @Date: 2021-04-27 17:05
 * @Author: tw.huang
 * @Version: v1.0.0
 **/
@TableName(value = "user")
@Data
public class User {

    private Long id;

    private String nickname;

    private String avatar;

    private String password;

    private String salt;

    private String email;

    private String github;

    private String website;

    private String about;

}
