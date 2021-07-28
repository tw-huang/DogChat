package top.twhuang.dogchat.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class SignInDTO {

    @NotEmpty(message = "邮件地址不能为空")
    private String email;

    @NotEmpty(message = "密码不能为空")
    @Size(min = 6,max = 20,message = "密码长度为6-20位")
    private String password;

}
