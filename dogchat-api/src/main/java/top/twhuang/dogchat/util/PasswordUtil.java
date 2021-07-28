package top.twhuang.dogchat.util;

import org.springframework.util.DigestUtils;
import sun.misc.BASE64Encoder;

import java.security.SecureRandom;
import java.util.Random;

public class PasswordUtil {

    private static final Integer DEFAULT_PLACE = 16;

    public static String getSalt() {
        Random RANDOM = new SecureRandom();
        byte[] salt = new byte[PasswordUtil.DEFAULT_PLACE];
        RANDOM.nextBytes(salt);
        return new BASE64Encoder().encode(salt);

    }

    public static String getSalt(int place) {
        Random RANDOM = new SecureRandom();
        if (0 < place && place < 32) {
            byte[] salt = new byte[place];
            RANDOM.nextBytes(salt);
            return new BASE64Encoder().encode(salt);
        } else {
            byte[] salt = new byte[PasswordUtil.DEFAULT_PLACE];
            RANDOM.nextBytes(salt);
            return new BASE64Encoder().encode(salt);
        }
    }

    public static String encryptPassword(String password, String salt) {
        String text =  password + salt;
        return DigestUtils.md5DigestAsHex(text.getBytes());
    }
}
