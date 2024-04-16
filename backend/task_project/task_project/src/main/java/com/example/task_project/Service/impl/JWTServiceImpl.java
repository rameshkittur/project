package com.example.task_project.Service.impl;

import com.example.task_project.Service.JWTService;
import com.zaxxer.hikari.pool.HikariProxyCallableStatement;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.sql.SQLException;
import java.util.Date;
import java.util.function.Function;
@Service
@RequiredArgsConstructor
public class JWTServiceImpl implements JWTService {
    private  String SECRET_KEY = "572676a4d5c81b816781e123ec516b1476caf291ea9f75dc5f8cc64a852d29dd";


    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parse(token);
            return true;
        } catch (Exception e) {
            System.out.println("Exception occurred during token validation: " + e.getMessage());
            return false;
        }
    }
    private Key getSignKey() {
        byte[] key = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(key);
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public String extractUserName(String token){
        return extractClaim(token,Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractClaims(token);
        return claimsResolver.apply(claims);
    }

}
