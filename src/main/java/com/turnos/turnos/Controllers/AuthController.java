package com.turnos.turnos.Login;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.turnos.turnos.Security.*;
import org.springframework.security.core.GrantedAuthority;


import java.util.List;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtIssuer issuer = new JwtIssuer();
    private final AuthenticationManager authenticationManager;

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request){
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal) authentication.getPrincipal();

        var roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();


        var token = issuer.issue(principal.getUserId(),principal.getEmail(), roles);
        return new LoginResponse(token);
    }
}
