package com.turnos.turnos.Login;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.turnos.turnos.Security.*;

import java.util.List;

@RestController
public class LoginRequest {
    private final JwtIssuer issuer = new JwtIssuer();

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request){
        var token = issuer.issue(1L,"nigga@gmail.com", List.of("USER"));
        return new LoginResponse(token);
    }
}
