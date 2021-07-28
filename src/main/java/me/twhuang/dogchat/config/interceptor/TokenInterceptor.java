package me.twhuang.dogchat.config.interceptor;

import com.auth0.jwt.interfaces.Claim;
import lombok.extern.slf4j.Slf4j;
import me.twhuang.dogchat.config.exception.CommonException;
import me.twhuang.dogchat.config.exception.TokenException;
import me.twhuang.dogchat.util.JwtUtil;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.Objects;

/**
 * @Author: tw.huang
 * @DateTime: 2020-08-01 22:28
 * @Description: Token拦截器
 */
@Configuration
@Slf4j
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = request.getHeader("Token");
        String parameterToken = request.getParameter("Token");

        if (Objects.isNull(token) && Objects.isNull(parameterToken)) {
            log.error("Token is null");
            throw new TokenException("Token is null");
        }

        Map<String, Claim> stringClaimMap = JwtUtil.verifyToken(Objects.isNull(token)?parameterToken:token);
        if (stringClaimMap == null) {
            log.error("Token error");
            throw new TokenException("Token error");
        }
        return true;

    }
}
