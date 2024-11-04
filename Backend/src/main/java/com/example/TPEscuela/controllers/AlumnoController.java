package com.example.TPEscuela.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.services.AlumnoService;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "http://localhost:4200")
public class AlumnoController {

	
	@Autowired
	private AlumnoService alumnoService;
	

	@GetMapping
	public ArrayList<Alumno> getAlumnos() { 
		return this.alumnoService.getAlumnos();
	}
	
	@PostMapping 
	public Alumno saveAlumno(@RequestBody Alumno Alumno) {
		return this.alumnoService.saveAlumno(Alumno);
	}
	
	@GetMapping(path="/{id}")
	public Optional<Alumno> getAlumnoById(@PathVariable("id") Long id){
		return this.alumnoService.getById(id);
	} 
	
	@DeleteMapping(path="/{id}")
	public String deleteById(@PathVariable("id") Long id) {
		boolean ok= this.alumnoService.deleteAlumno(id);
		
		if (ok) {
			return "Alumno con id" + id + "eliminado"; 
		}else {
			return "error";
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Alumno> updateAlumno(@PathVariable Long id, @RequestBody Alumno AlumnoDetails) {
	        Optional<Alumno> alumno = alumnoService.getById(id);
	        if (alumno.isPresent()) {
	        	Alumno AlumnoToUpdate = alumno.get();
	            AlumnoToUpdate.setNombre(AlumnoDetails.getNombre());
	            AlumnoToUpdate.setFechaNacimiento(AlumnoDetails.getFechaNacimiento());
	            Alumno updatedAlumno = alumnoService.saveAlumno(AlumnoToUpdate);
	            return ResponseEntity.ok(updatedAlumno);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	
	
}
