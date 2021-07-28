package top.twhuang.dogchat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import top.twhuang.dogchat.entity.Message;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Description: TODO
 * @Date: 2021-04-27 17:15
 * @Author: tw.huang
 * @Version: v1.0.0
 **/
@Mapper
public interface MessageMapper extends BaseMapper<Message> {
}
