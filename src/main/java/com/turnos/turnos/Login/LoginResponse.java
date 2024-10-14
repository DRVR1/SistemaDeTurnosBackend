package com.turnos.turnos.Login;


import lombok.Getter;

@Getter
public class LoginResponse {
    private final String accessToken;

    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
