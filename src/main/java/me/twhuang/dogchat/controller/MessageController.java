package me.twhuang.dogchat.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.AllArgsConstructor;
import me.twhuang.dogchat.entity.Message;
import me.twhuang.dogchat.entity.User;
import me.twhuang.dogchat.mapper.MessageMapper;
import me.twhuang.dogchat.mapper.UserMapper;
import me.twhuang.dogchat.util.JwtUtil;
import me.twhuang.dogchat.util.Result;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;

@RestController
@AllArgsConstructor
public class MessageController {

    private MessageMapper messageMapper;

    private UserMapper userMapper;

    @GetMapping("/api/message")
    public Result messagePage(@RequestParam(required = false, defaultValue = "1") Integer pageNo,
                              @RequestParam(required = false, defaultValue = "20") Integer pageSize) {
        Page<Message> page = new Page<>(pageNo, pageSize);
        Page<Message> result = this.messageMapper.selectPage(page, new QueryWrapper<Message>().lambda()
                .eq(Message::getDelFlag, false));
        result.getRecords().forEach(x -> {
            User user = this.userMapper.selectById(x.getUserId());
            x.setUser(user);
            if (x.getQuoteMessageId() != null) {
                Message message = this.messageMapper.selectById(x.getQuoteMessageId());
                x.setQuoteMessage(message);
            }
        });
        return Result.success(result);
    }

}
