package me.twhuang.dogchat.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @Description: redis 心跳保存连接
 * @Date: 2021-04-25 13:55
 * @Author: tw.huang
 * @Version: v1.0.0
 **/
@Component
public class RedisTask {

    @Autowired
    private RedisTemplate redisTemplate;

    @Scheduled(cron = "0/10 * * * * *")
    public void timer() {
        redisTemplate.opsForValue().get("heartbeat");
    }
}