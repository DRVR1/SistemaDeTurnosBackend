package com.turnos.turnos.Security;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JwtIssuer {
    private final JwtProperties properties = new JwtProperties();
    public String issue(long userID, String email, List<String> roles){
        return JWT.create()
                .withSubject(String.valueOf(userID))
                .withExpiresAt(Instant.now().plus(Duration.of(properties.getExpireDays(), ChronoUnit.DAYS)))
                .withClaim("e",email)
                .withClaim("a",roles)
                .sign(Algorithm.HMAC256(properties.getKey()));
    }
}
