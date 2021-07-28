package me.twhuang.dogchat.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.extern.slf4j.Slf4j;
import me.twhuang.dogchat.entity.User;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @Author: tw.huang
 * @DateTime: 2020-08-01 18:01
 * @Description: jwt工具类
 */
@Slf4j
public class JwtUtil {

    /**
     * 密钥
     */
    private static final String SECRET = "HelloWorld";

    /**
     * 过期时间 单位为秒
     **/
    private static final long EXPIRATION = 24 * 60 * 60;

    /**
     * 生成用户token,设置token超时时间
     */
    public static String createToken(User user) {
        //过期时间
        Date expireDate = new Date(System.currentTimeMillis() + EXPIRATION * 1000);
        Map<String, Object> map = new HashMap<>();
        map.put("alg", "HS256");
        map.put("typ", "JWT");
        return JWT.create()
                // 添加头部
                .withHeader(map)
                //可以将基本信息放到claims中
                .withClaim("id", user.getId())
                .withClaim("nickName", user.getNickname())
                .withClaim("email", user.getEmail())
                //超时设置,设置过期的日期
                .withExpiresAt(expireDate)
                //签发时间
                .withIssuedAt(new Date())
                //SECRET加密
                .sign(Algorithm.HMAC256(SECRET));
    }

    /**
     * 校验token并解析token
     */
    public static Map<String, Claim> verifyToken(String token) {
        DecodedJWT jwt;
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            jwt = verifier.verify(token);
            return jwt.getClaims();
        } catch (Exception e) {
            log.error(e.getMessage());
            log.error("Token解码异常");
            //解码异常则抛出异常
            return null;
        }
    }


    public static Long getUserId(HttpServletRequest request) {
        String token = request.getHeader("Token");
        Map<String, Claim> map = verifyToken(token);
        if (!Objects.isNull(map)) {
            return map.get("id").asLong();
        }
        return null;
    }

    public static Long getUserId(String token) {
        Map<String, Claim> map = verifyToken(token);
        if (!Objects.isNull(map)) {
            return map.get("id").asLong();
        }
        return null;
    }

}
