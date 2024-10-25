package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.ObraSocial;
import com.turnos.turnos.Repositories.ObraSocialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObraSocialService {

    @Autowired
    private ObraSocialRepository obraSocialRepository;

    public ObraSocial agregarObraSocial(ObraSocial obraSocial) {
        return obraSocialRepository.save(obraSocial);
    }

    public List<ObraSocial> listarObrasSociales() {
        return obraSocialRepository.findAll();
    }
}