package com.turnos.turnos.Security;

import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtToPrincipalConverter {
    public UserPrincipal convert(DecodedJWT jwt){

        Long id = Long.valueOf(jwt.getSubject());
        String mail = jwt.getClaim("e").asString();
        List<SimpleGrantedAuthority> authorities = extractAuthoritiesFromClaim(jwt);

        return new UserPrincipal(id,mail,"",authorities);

    }

    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt){
        var claim = jwt.getClaim("a");
        if (claim.isNull() || claim.isMissing()) return List.of();
        return claim.asList(SimpleGrantedAuthority.class);
    }
}
