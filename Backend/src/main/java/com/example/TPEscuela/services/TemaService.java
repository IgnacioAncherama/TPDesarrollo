package com.example.TPEscuela.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TPEscuela.models.Tema;
import com.example.TPEscuela.repository.ITemaRepository;

@Service
public class TemaService {
	@Autowired
	ITemaRepository temaRepository;
	
	public Optional<Tema> getById(Long id){
		return temaRepository.findById(id);	
	}
	
	
	public ArrayList<Tema>  getTemas(){
		return (ArrayList<Tema>) temaRepository.findAll();
	}
	
	public Tema saveTema(Tema tema) {
		return temaRepository.save(tema);
	}
	
	public Boolean deleteTema(Long id) {
		try {
			temaRepository.deleteById(id);
			return true;
		}catch (Exception e) {
			return false;
		}
	}
}

