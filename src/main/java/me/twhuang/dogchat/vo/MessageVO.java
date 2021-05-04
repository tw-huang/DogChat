package me.twhuang.dogchat.vo;

import lombok.Data;

import java.util.Date;

@Data
public class MessageVO {

    private Long id;
    private String nickname;
    private String avatar;
    private Date pushTime;
    private String body;
    private String quoteMessage;

}
