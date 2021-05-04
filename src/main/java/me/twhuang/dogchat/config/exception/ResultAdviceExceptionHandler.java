package me.twhuang.dogchat.config.exception;

import lombok.extern.slf4j.Slf4j;
import me.twhuang.dogchat.util.Result;
import me.twhuang.dogchat.util.ResultEnum;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ResultAdviceExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public Result handleCommonException(CommonException e) {
        log.error(e.getMessage(), e);
        return Result.failure(e.getMessage());
    }

    @ExceptionHandler(TokenException.class)
    public Result handleTokenException(TokenException e) {
        log.error(e.getMessage(), e);
        return Result.failure(ResultEnum.UNAUTHORIZED.getCode(), ResultEnum.UNAUTHORIZED.getMsg());
    }

    @ExceptionHandler(BindException.class)
    public Result handleBindException(BindException e){
        log.error(e.getMessage(), e);
        StringBuffer message = new StringBuffer();
        e.getAllErrors().forEach(error -> {
            message.append(error.getDefaultMessage()).append(",");
        });
        String result = message.toString();
        return Result.failure(result.substring(0, result.length() - 1));
    }

}
