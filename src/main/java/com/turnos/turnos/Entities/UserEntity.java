package com.turnos.turnos.Entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class UserEntity {
    private Long id;
    private String email;
    private String password;
    private String role;
    private String extraInfo;


    public UserEntity(Long id, String email, String password, String role, String extraInfo) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.extraInfo = extraInfo;
    }
}
