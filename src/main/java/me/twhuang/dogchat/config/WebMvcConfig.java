package me.twhuang.dogchat.config;

import me.twhuang.dogchat.config.interceptor.CorsInterceptor;
import me.twhuang.dogchat.config.interceptor.TokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private TokenInterceptor tokenInterceptor;

    @Autowired
    private CorsInterceptor corsInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 跨域拦截器需放在最上面
        registry.addInterceptor(corsInterceptor).addPathPatterns("/**");
        // Token拦截器
        registry.addInterceptor(tokenInterceptor).addPathPatterns("/api/**")
                .excludePathPatterns("/api/user/signUp")
                .excludePathPatterns("/api/user/signIn")
                .excludePathPatterns("/api/message");
    }
}
