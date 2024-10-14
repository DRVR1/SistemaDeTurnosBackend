package com.turnos.turnos.Security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Aplica a todas las rutas
                .allowedOrigins("*")  // Permite todos los orígenes
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Permite todos los métodos HTTP
                .allowedHeaders("*")  // Permite todos los encabezados
                .allowCredentials(false);  // Si no necesitas cookies o autenticación basada en sesión, mantén esto en 'false'
    }
}