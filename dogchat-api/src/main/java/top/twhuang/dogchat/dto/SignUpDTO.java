package top.twhuang.dogchat.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class SignUpDTO {

    @NotEmpty(message = "昵称不能为空")
    @Size(max = 20,message = "昵称不能超过20个字符")
    private String nickname;

    @NotEmpty(message = "密码不能为空")
    @Size(min = 6,max = 20,message = "密码长度为6-20位")
    private String password;

    @NotEmpty(message = "邮件地址不能为空")
    @Email(message = "请输入正常邮箱地址")
    private String email;

}
