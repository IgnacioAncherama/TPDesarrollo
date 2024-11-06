package com.example.TPEscuela.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.example.TPEscuela.models.Docente;
import com.example.TPEscuela.services.DocenteService;
import com.example.TPEscuela.services.CursoService;


@RestController
@RequestMapping("/api/docentes")
@CrossOrigin(origins = "http://localhost:4200")
public class DocenteController {
	@Autowired
	private DocenteService docenteService;

	@Autowired
	private CursoService cursoService;
	

	@GetMapping
	public ArrayList<Docente> getDocentes() { 
		return this.docenteService.getDocentes();
	}
	
	@PostMapping 
	public Docente saveDocente(@RequestBody Docente docente) {
		return this.docenteService.saveDocente(docente);
	}
	
	@GetMapping(path="/{id}")
	public Optional<Docente> getDocenteById(@PathVariable("id") Long id){
		return this.docenteService.getById(id);
	} 
	
	@DeleteMapping(path="/{id}")
	public String deleteById(@PathVariable("id") Long id) {
		boolean ok= this.docenteService.deleteDocente(id);
		
		if (ok) {
			return "Docente con id" + id + "eliminado"; 
		}else {
			return "error";
		}
	}

	@PutMapping("/{id}")
	 public ResponseEntity<Docente> updateDocente(@PathVariable Long id, @RequestBody Docente docenteDetails) {
	        Optional<Docente> docente = docenteService.getById(id);
	        if (docente.isPresent()) {
	        	Docente docenteToUpdate = docente.get();
	            docenteToUpdate.setNombre(docenteDetails.getNombre());
	            docenteToUpdate.setLegajo(docenteDetails.getLegajo());
	            Docente updatedDocente = docenteService.saveDocente(docenteToUpdate);
	            return ResponseEntity.ok(updatedDocente);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	@PatchMapping("/{id}")
	public ResponseEntity<Docente> partialUpdateDocente(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
		Optional<Docente> docenteOptional = docenteService.getById(id);

		if (docenteOptional.isPresent()) {
			Docente docenteToUpdate = docenteOptional.get();

			updates.forEach((key, value) -> {
				switch (key) {
					case "nombre":
						docenteToUpdate.setNombre(value.toString()); // Conversión segura a String
						break;
					case "legajo":
						docenteToUpdate.setLegajo(Long.parseLong(value.toString())); // Conversión segura a Long
						break;
				}
			});

			Docente updatedDocente = docenteService.saveDocente(docenteToUpdate);
			return ResponseEntity.ok(updatedDocente);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping("/{id}/cursosVigentes/alumnos")
	public ResponseEntity<List<Map<String, Object>>> getAlumnosDeCursosVigentes(@PathVariable("id") Long docenteId) {
		List<Map<String, Object>> cursosConAlumnos = cursoService.getCursosVigentesConAlumnos(docenteId);

		if (cursosConAlumnos.isEmpty()) {
			return ResponseEntity.noContent().build();  // No hay alumnos en los cursos vigentes
		} else {
			return ResponseEntity.ok(cursosConAlumnos);  // Devolver lista de alumnos por curso
		}
	}
}