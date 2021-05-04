package me.twhuang.dogchat;

import sun.misc.BASE64Encoder;

import java.security.SecureRandom;
import java.util.Random;

public class TestDemo {

    public static void main(String[] args) {
        Random RANDOM = new SecureRandom();
        byte[] salt = new byte[16];
        RANDOM.nextBytes(salt);
        String str = new BASE64Encoder().encode(salt);
    }
}
