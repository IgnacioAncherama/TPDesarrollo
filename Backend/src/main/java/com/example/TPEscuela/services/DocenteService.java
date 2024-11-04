package com.example.TPEscuela.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TPEscuela.models.Docente;
import com.example.TPEscuela.repository.IDocenteRepository;

@Service
public class DocenteService {
	@Autowired
	IDocenteRepository docenteRepository;
	
	public Optional<Docente> getById(Long id){
		return docenteRepository.findById(id);	
	}
	
	public ArrayList<Docente>  getDocentes(){
		return (ArrayList<Docente>) docenteRepository.findAll();
	}
	
	public Docente saveDocente(Docente user) {
		return docenteRepository.save(user);
	}
	
	public Boolean deleteDocente(Long id) {
		try {
			docenteRepository.deleteById(id);
			return true;
		}catch (Exception e) {
			return false;
		}
	}
	
	public Docente updateById(Docente request, Long id){
		Docente docente=docenteRepository.findById(id).get();
		
		docente.setNombre(request.getNombre());
		docente.setLegajo(request.getLegajo());

		
		return docente;
	}


}