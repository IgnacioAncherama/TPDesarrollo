package com.example.TPEscuela.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.TPEscuela.models.Tema;
import com.example.TPEscuela.services.TemaService;

@RestController
@RequestMapping("/api/temas")
@CrossOrigin(origins = "http://localhost:4200")
public class TemaController {

	@Autowired
	private TemaService temaService;
	

	@GetMapping
	public ArrayList<Tema> getTemas() { 
		return this.temaService.getTemas();
	}
	
	@PostMapping 
	public Tema saveTema(@RequestBody Tema Tema) {
		return this.temaService.saveTema(Tema);
	}
	
	@GetMapping(path="/{id}")
	public Optional<Tema> getTemaById(@PathVariable("id") Long id){
		return this.temaService.getById(id);
	} 
	
	@DeleteMapping(path="/{id}")
	public String deleteById(@PathVariable("id") Long id) {
		boolean ok= this.temaService.deleteTema(id);
		
		if (ok) {
			return "Tema con id" + id + "eliminado"; 
		}else {
			return "error";
		}
	}

	@PutMapping("/{id}")
	 public ResponseEntity<Tema> updateTema(@PathVariable Long id, @RequestBody Tema temaDetails) {
	        Optional<Tema> tema = temaService.getById(id);
	        if (tema.isPresent()) {
	        	Tema temaToUpdate = tema.get();
	            temaToUpdate.setNombre(temaDetails.getNombre());
	            temaToUpdate.setDescripcion(temaDetails.getDescripcion());
	            Tema updatedTema = temaService.saveTema(temaToUpdate);
	            return ResponseEntity.ok(updatedTema);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
}
