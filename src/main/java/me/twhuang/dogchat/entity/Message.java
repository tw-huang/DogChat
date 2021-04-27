package me.twhuang.dogchat.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

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

    private Long id;

    private Boolean delFlag;

    private Long userId;

    private Long quoteMessageId;

    private Date pushTime;

    private String body;

}
