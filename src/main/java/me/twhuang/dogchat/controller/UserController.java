package me.twhuang.dogchat.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.AllArgsConstructor;
import me.twhuang.dogchat.dto.SignInDTO;
import me.twhuang.dogchat.entity.User;
import me.twhuang.dogchat.mapper.UserMapper;
import me.twhuang.dogchat.util.JwtUtil;
import me.twhuang.dogchat.util.PasswordUtil;
import me.twhuang.dogchat.util.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Objects;

/**
 * @Description: TODO
 * @Date: 2021-04-27 17:03
 * @Author: tw.huang
 * @Version: v1.0.0
 **/
@RestController
@AllArgsConstructor
public class UserController {

    private UserMapper userMapper;

    @PostMapping("/api/user/signUp")
    public Result signUp(@Valid @RequestBody User user) {
        String salt = PasswordUtil.getSalt();
        String password = PasswordUtil.encryptPassword(user.getPassword(), salt);
        user.setSalt(salt);
        user.setPassword(password);
        this.userMapper.insert(user);
        return Result.success("注册成功");
    }

    @PostMapping("/api/user/signIn")
    public Result signIn(@Valid @RequestBody SignInDTO signInDTO) {
        User user = this.userMapper.selectOne(new QueryWrapper<User>().lambda()
                .eq(User::getEmail, signInDTO.getEmail()));
        if (Objects.isNull(user)) {
            return Result.failure("该邮箱还没注册");
        }
        if (PasswordUtil.encryptPassword(signInDTO.getPassword(), user.getSalt()).equals(user.getPassword())) {
            HashMap<String, String> map = new HashMap<>(1);
            String token = JwtUtil.createToken(user);
            map.put("token", token);
            return Result.success(map, "登录成功");
        }
        return Result.failure("密码错误");
    }

    @GetMapping("/api/user")
    public Result user(HttpServletRequest request) {
        Long userId = JwtUtil.getUserId(request);
        User user = this.userMapper.selectById(userId);
        return Result.success(user, "用户信息");
    }

}
