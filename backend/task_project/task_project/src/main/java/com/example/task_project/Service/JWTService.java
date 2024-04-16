package com.example.task_project.Service;

import io.jsonwebtoken.Claims;

public interface JWTService {
    boolean validateToken(String token);
    Claims extractClaims(String token);
    String extractUserName(String token);

}
