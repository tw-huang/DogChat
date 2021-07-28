package top.twhuang.dogchat.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import lombok.extern.slf4j.Slf4j;
import top.twhuang.dogchat.entity.Message;
import top.twhuang.dogchat.entity.User;
import top.twhuang.dogchat.mapper.MessageMapper;
import top.twhuang.dogchat.mapper.UserMapper;
import top.twhuang.dogchat.util.JwtUtil;
import top.twhuang.dogchat.util.Result;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;


@ServerEndpoint("/api/user/{token}")
@Component
@Slf4j
public class WebSocket {

    private static MessageMapper messageMapper;

    private static UserMapper userMapper;

    @Resource
    public void setMessageMapper(MessageMapper messageMapper) {
        WebSocket.messageMapper = messageMapper;
    }

    @Resource
    public void setUserMapper(UserMapper userMapper) {
        WebSocket.userMapper = userMapper;
    }

    //静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static int onlineCount = 0;

    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
    private static ConcurrentHashMap<String, WebSocket> webSocketMap = new ConcurrentHashMap<>();

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

    //接收userId
    private String userId = "";

    //连接建立成功调用的方法
    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token) {
        Long userId = JwtUtil.getUserId(token);
        if (Objects.isNull(userId)) {
            return;
        }
        this.session = session;
        this.userId = String.valueOf(userId);
        if (webSocketMap.containsKey(this.userId)) {
            webSocketMap.remove(this.userId);
            //加入set中
            webSocketMap.put(this.userId, this);

        } else {
            //加入set中
            webSocketMap.put(this.userId, this);
            //在线数加1
            addOnlineCount();
        }
        log.info("用户Id连接:" + this.userId + ",当前在线用户数量为:" + getOnlineCount());
        sendMessageToAll(JSON.toJSONString(Result.success(getOnlineCount(), "ConnectSuccess")));
    }

    //连接关闭调用的方法
    @OnClose
    public void onClose() {
        if (webSocketMap.containsKey(userId)) {
            //从set中删除
            webSocketMap.remove(userId);
            subOnlineCount();
        }
        log.info("用户Id退出:" + userId + ",当前在线用户数量为:" + getOnlineCount());
        sendMessageToAll(JSON.toJSONString(Result.success(getOnlineCount(), "ConnectClose")));
    }

    //收到客户端消息后调用的方法
    @OnMessage
    public void onMessage(String json) {
        log.info("用户Id消息:" + userId + ",报文:" + json);
        if (json == null) {
            return;
        }
        try {
            //消息保存到数据库
            Message msg = JSON.parseObject(json, Message.class);
            msg.setUserId(Long.valueOf(userId));
            msg.setDelFlag(false);
            msg.setPushTime(new Date());
            messageMapper.insert(msg);
            //推送到在线客户端
            User user = userMapper.selectById(userId);
            //重要信息不返回
            user.setPassword(null);
            user.setSalt(null);
            msg.setUser(user);
            if (msg.getQuoteMessageId() != null) {
                Message message = messageMapper.selectById(msg.getQuoteMessageId());
                msg.setQuoteMessage(message);
            }
            sendMessageToAll(JSON.toJSONString(Result.success(msg, "ReceiveMessage"), SerializerFeature.WriteMapNullValue, SerializerFeature.WriteDateUseDateFormat));
        } catch (Exception e) {
            e.printStackTrace();
            log.info("用户Id发送:" + userId + ",参数错误");
        }
    }

    //错误处理
    @OnError
    public void onError(Throwable error) {
        log.error("用户Id错误:" + this.userId + ",原因:" + error.getMessage());
        error.printStackTrace();
    }

    private void sendMessageToAll(String message) {
        for (WebSocket item : webSocketMap.values()) {
            //异步发送消息
            item.session.getAsyncRemote().sendText(message);
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    private static synchronized void addOnlineCount() {
        WebSocket.onlineCount++;
    }

    private static synchronized void subOnlineCount() {
        WebSocket.onlineCount--;
    }
}
