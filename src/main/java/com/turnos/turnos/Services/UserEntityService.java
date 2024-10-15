package com.turnos.turnos.Services;
import com.turnos.turnos.Entities.UserEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserEntityService {

    public Optional<UserEntity> findByEmail(String email){
        //simula consultar el mail a la base de datos
        if (!Objects.equals(email, "email@email.com")){
            return Optional.empty();
        }
        UserEntity userEntity = new UserEntity(1L,"email@email.com","encodedpass","admin","no se otra ingo");
        return Optional.of(userEntity);
    }
}
