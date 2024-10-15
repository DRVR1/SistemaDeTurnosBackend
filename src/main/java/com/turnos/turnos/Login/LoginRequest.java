package com.turnos.turnos.Login;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.turnos.turnos.Security.*;

import java.util.List;

@RestController
public class LoginRequest {
    private final JwtIssuer issuer = new JwtIssuer();
    private final AuthenticationManager authenticationManager;

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request){
        var authenticate 
        var token = issuer.issue(1L,"nigga@gmail.com", List.of("USER"));
        return new LoginResponse(token);
    }
}
