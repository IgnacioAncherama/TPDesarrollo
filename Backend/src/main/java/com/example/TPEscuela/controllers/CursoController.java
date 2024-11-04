package com.example.TPEscuela.controllers;

import java.time.LocalDate;
import java.util.*;


import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.models.Tema;
import com.example.TPEscuela.services.AlumnoService;
import com.example.TPEscuela.services.TemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.TPEscuela.models.Curso;
import com.example.TPEscuela.services.CursoService;
import com.example.TPEscuela.services.DocenteService;
import com.example.TPEscuela.models.Docente;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "http://localhost:4200")
public class CursoController {
	@Autowired
	private CursoService cursoService;
	@Autowired
	private TemaService temaService;
	@Autowired
	private DocenteService docenteService;
	@Autowired
	private AlumnoService alumnoService;
	@GetMapping
	public ArrayList<Curso> getCursos() {
		return this.cursoService.getCursos();
	}

	@PostMapping
	public Curso saveCurso(@RequestBody Curso Curso) {
		return this.cursoService.saveCurso(Curso);
	}

	@GetMapping(path = "/{id}")
	public Optional<Curso> getCursoById(@PathVariable("id") Long id) {
		return this.cursoService.getById(id);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id") Long id) {
		boolean ok = this.cursoService.deleteCurso(id);

		if (ok) {
			return "Curso con id" + id + "eliminado";
		} else {
			return "error";
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso cursoDetails) {
		Optional<Curso> cursoOpt = cursoService.getById(id);
		if (cursoOpt.isPresent()) {
			Curso cursoToUpdate = cursoOpt.get();

			// Actualizar los datos básicos del curso
			cursoToUpdate.setfechaInicio(cursoDetails.getfechaInicio());
			cursoToUpdate.setfechaFin(cursoDetails.getfechaFin());
			cursoToUpdate.setPrecio(cursoDetails.getPrecio());
			cursoToUpdate.setDocente(cursoDetails.getDocente());
			cursoToUpdate.setTema(cursoDetails.getTema());

			// Actualización de los alumnos
			List<Alumno> nuevosAlumnos = cursoDetails.getAlumnos();
			if (nuevosAlumnos != null) {
				// Convert the existing students to a Set for faster lookup
				Set<Alumno> alumnosExistentes = new HashSet<>(cursoToUpdate.getAlumnos());

				// Remove the students that are no longer in the updated list
				cursoToUpdate.getAlumnos().removeIf(alumno -> !nuevosAlumnos.contains(alumno));

				// Add the new students (if they don't already exist in the list)
				for (Alumno alumno : nuevosAlumnos) {
					if (!alumnosExistentes.contains(alumno)) {
						alumno = alumnoService.save(alumno);
						cursoToUpdate.getAlumnos().add(alumno);
					}
				}
			}

			// Guardar el curso actualizado
			Curso updatedCurso = cursoService.saveCurso(cursoToUpdate);
			return ResponseEntity.ok(updatedCurso);
		} else {
			return ResponseEntity.notFound().build();
		}
	}



	@PatchMapping("/{id}")
	public ResponseEntity<Curso> partialUpdateCurso(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
		Optional<Curso> cursoOptional = cursoService.getById(id);

		if (cursoOptional.isPresent()) {
			Curso cursoToUpdate = cursoOptional.get();

			updates.forEach((key, value) -> {
				switch (key) {
					case "fecha_inicio":
						cursoToUpdate.setfechaInicio(LocalDate.parse((String) value)); // Conversión de String a Date
						break;
					case "fecha_fin":
						cursoToUpdate.setfechaFin(LocalDate.parse((String) value)); // Conversión de String a Date
						break;
					case "precio":
						cursoToUpdate.setPrecio(Double.parseDouble(value.toString())); // Conversión segura a Double
						break;
					case "tema":
						// Suponiendo que 'tema' es un ID de un objeto Tema
						Tema tema = temaService.getById(Long.parseLong(value.toString())).orElse(null);
						cursoToUpdate.setTema(tema);
						break;
					case "docente":
						// Suponiendo que 'docente' es un ID de un objeto Docente
						Docente docente = docenteService.getById(Long.parseLong(value.toString())).orElse(null);
						cursoToUpdate.setDocente(docente);
						break;
				}
			});

			Curso updatedCurso = cursoService.saveCurso(cursoToUpdate);
			return ResponseEntity.ok(updatedCurso);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping("/fecha-fin")
	public ResponseEntity<List<Curso>> getCursosByFechaFin(@RequestParam(value = "fecha", required = true) String fechaFin) {
		try {
			// Intentar convertir la fecha de String a LocalDate
			LocalDate localDate = LocalDate.parse(fechaFin);
			List<Curso> cursos = cursoService.getByFechaFin(localDate);
			return ResponseEntity.ok(cursos);
		} catch (Exception e) {
			// Si hay algún error en la conversión de fecha, devolver un Bad Request
			return ResponseEntity.badRequest().body(null);
		}
	}

}






