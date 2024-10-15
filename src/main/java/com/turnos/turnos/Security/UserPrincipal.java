package com.turnos.turnos.Security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class UserPrincipal implements UserDetails {

    private final Long userId;
    private final String email;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long userId, String email, Collection<? extends GrantedAuthority> authorities) {
        this.userId = userId;
        this.email = email;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return ""; // Devuelve la contraseña si es necesario
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Modificar según la lógica de tu aplicación
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Modificar según la lógica de tu aplicación
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Modificar según la lógica de tu aplicación
    }

    @Override
    public boolean isEnabled() {
        return true; // Modificar según la lógica de tu aplicación
    }
}
