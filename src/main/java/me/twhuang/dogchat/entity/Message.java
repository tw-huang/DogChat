package me.twhuang.dogchat.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 * @Description: user
 * @Date: 2021-04-27 17:05
 * @Author: tw.huang
 * @Version: v1.0.0
 **/
@TableName(value = "message")
@Data
public class Message {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    @JsonIgnore
    private Boolean delFlag;

    private Long userId;

    private Long quoteMessageId;

    private Date pushTime;

    @NotBlank(message = "发表内容不能为空")
    private String body;

    @TableField(exist = false)
    private User user;

    @TableField(exist = false)
    private Message quoteMessage;

}
