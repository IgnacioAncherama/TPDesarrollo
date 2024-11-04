package com.example.TPEscuela.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.repository.IAlumnoRepository;

@Service
public class AlumnoService {

		@Autowired
		IAlumnoRepository alumnoRepository;
		
		public Optional<Alumno> getById(Long id){
			return alumnoRepository.findById(id);	
		}
		
		public ArrayList<Alumno>  getAlumnos(){
			return (ArrayList<Alumno>) alumnoRepository.findAll();
		}
		
		public Alumno saveAlumno(Alumno user) {
			return alumnoRepository.save(user);
		}
		
		public Boolean deleteAlumno(Long id) {
			try {
				alumnoRepository.deleteById(id);
				return true;
			}catch (Exception e) {
				return false;
			}
		}
		
		public Alumno updateById(Alumno request, Long id){
			Alumno alumno=alumnoRepository.findById(id).get();
			
			alumno.setNombre(request.getNombre());
			alumno.setFechaNacimiento(request.getFechaNacimiento());
		
			return alumno;
	}

	public Alumno save(Alumno alumno) {
		return alumnoRepository.save(alumno);
	}
}