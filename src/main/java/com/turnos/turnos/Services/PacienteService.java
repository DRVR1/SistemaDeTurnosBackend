package com.turnos.turnos.Services;

import com.turnos.turnos.DTOs.ResponseMessage;
import com.turnos.turnos.Entities.ObraSocial;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<ResponseMessage> altaPaciente(String dni,
                                                        String telefono,
                                                        String nombre,
                                                        String apellido,
                                                        String email,
                                                        String password,
                                                        ObraSocial obrasocial) {

//---------- soy marce: aca es solo verificaciones? porque puede no tener obra social
        // Verificar que ninguno de los campos sea nulo o esté vacío
        if (dni == null || dni.isBlank() ||
                telefono == null || telefono.isBlank() ||
                nombre == null || nombre.isBlank() ||
                apellido == null || apellido.isBlank() ||
                email == null || email.isBlank() ||
                password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Por favor completar todos los campos."));
        }

        // Validar que el email tenga al menos un valor antes y después del arroba
        if (!email.matches("^[^@]+@[^@]+$")) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Formato de email inválido. Ejemplo: ejemplo@gmail.com"));
        }

        // Verificar que la contraseña tenga al menos 5 caracteres
        if (password.length() < 5) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Por su seguridad, la contraseña debe tener al menos 5 caracteres"));
        }

        try{
            String encodedPass = passwordEncoder.encode(password);
            Paciente paciente = new Paciente(dni, telefono, nombre, apellido, email, encodedPass,obrasocial);
            pacienteRepository.save(paciente);
            return ResponseEntity.ok().body(new ResponseMessage("Registro exitoso, ya puede iniciar sesion con su mail y contraseña."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Error al registrarse: El correo ya fue registrado."));
        }

    }


    public Paciente obtenerPacientePorDni(String dni) {
        return pacienteRepository.findByDni(dni); // Método a implementar en el repositorio
    }

    public ResponseEntity<?> obtenerPacientePorId(Long id){
        Optional<Paciente> op = pacienteRepository.findById(id);
        if(op.isPresent()){
            return ResponseEntity.ok(op.get());
        }else{
            return ResponseEntity.badRequest().body(new ResponseMessage("El paciente proporcionado no existe."));
        }

    }
}
//