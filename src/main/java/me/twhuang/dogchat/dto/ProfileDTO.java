package me.twhuang.dogchat.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class ProfileDTO {

    @NotEmpty(message = "昵称不能为空")
    @Size(max = 20,message = "昵称不能超过20个字符")
    private String nickname;

    private String github;

    private String website;

    private String about;
}
