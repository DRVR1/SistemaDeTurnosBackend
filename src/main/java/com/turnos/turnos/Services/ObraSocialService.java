package com.turnos.turnos.Services;
import com.turnos.turnos.Entities.ObraSocial;
import com.turnos.turnos.Repositories.ObraSocialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObraSocialService {

    @Autowired
    private ObraSocialRepository obrasocialRepository;

    public ObraSocial altaObraSocial(String nombre) {
        ObraSocial obrasocial = new ObraSocial(nombre);
        return obrasocialRepository.save(obrasocial);
    }

    public List<ObraSocial> verObraSocial(){
        return obrasocialRepository.findAll();
    }

}//