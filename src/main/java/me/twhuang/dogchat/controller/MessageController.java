package me.twhuang.dogchat.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.AllArgsConstructor;
import me.twhuang.dogchat.entity.Message;
import me.twhuang.dogchat.mapper.MessageMapper;
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

    @GetMapping("/api/message")
    public Result messagePage(@RequestParam (required = false,defaultValue = "1") Integer pageNo,
                              @RequestParam (required = false,defaultValue = "20") Integer pageSize){
        Page<Message> page = new Page<>(pageNo,pageSize);
        Page<Message> result = this.messageMapper.selectPage(page, new QueryWrapper<Message>().lambda()
        .eq(Message::getDelFlag,false));
        return Result.success(result);
    }

    @PostMapping("/api/message")
    public Result message(@Valid @RequestBody Message message, HttpServletRequest request){
        Long userId = JwtUtil.getUserId(request);
        message.setUserId(userId);
        message.setPushTime(new Date());
        message.setDelFlag(false);
        this.messageMapper.insert(message);
        return Result.success();
    }

}
