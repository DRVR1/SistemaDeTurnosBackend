package com.turnos.turnos.Login;


import lombok.Getter;

@Getter
public class LoginResponse {
    private final String accessToken;
    private final String role;
    private final Long userId;

    public LoginResponse(String accessToken, String role, Long userId) {
        this.accessToken = accessToken;
        this.role = role;
        this.userId = userId;
    }
}
