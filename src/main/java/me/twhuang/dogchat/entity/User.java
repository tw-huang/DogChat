package me.twhuang.dogchat.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

/**
 * @Description: user
 * @Date: 2021-04-27 17:05
 * @Author: tw.huang
 * @Version: v1.0.0
 **/
@TableName(value = "user")
@Data
public class User {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    @NotEmpty(message = "昵称不能为空")
    @Size(max = 20,message = "昵称不能超过20个字符")
    private String nickname;

    private String avatar;

    @NotEmpty(message = "密码不能为空")
    @Size(min = 6,max = 20,message = "密码长度为6-20位")
    @JsonIgnore
    private String password;

    @JsonIgnore
    private String salt;

    @NotEmpty(message = "邮件地址不能为空")
    private String email;

    private String github;

    private String website;

    private String about;

}
