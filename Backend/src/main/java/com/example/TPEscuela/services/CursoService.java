package com.example.TPEscuela.services;

import java.util.*;
import java.time.LocalDate;
import java.util.stream.Collectors;

import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.models.Curso_alumnosDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TPEscuela.models.Curso;
import com.example.TPEscuela.repository.ICursoRepository;

@Service
public class CursoService {

	@Autowired
	ICursoRepository cursoRepository;

	public Optional<Curso> getById(Long id) {
		return cursoRepository.findById(id);
	}

	public ArrayList<Curso> getCursos() {
		return (ArrayList<Curso>) cursoRepository.findAll();
	}

	@Transactional
	public Curso saveCurso(Curso curso) {
		return cursoRepository.save(curso);
	}

	public Boolean deleteCurso(Long id) {
		try {
			cursoRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public ArrayList<Curso> getByFechaFin(LocalDate fechaFin) {
		return (ArrayList<Curso>) cursoRepository.findByFechaFin(fechaFin);
	}

	public List<Curso> getCursosVigentesByDocente(Long docenteId) {
		LocalDate now = LocalDate.now(); // Obtener la fecha actual
		return cursoRepository.findByDocenteIdAndFechaFinAfterAndFechaInicioBefore(docenteId, now, now);
	}

	public List<Curso> getCursosByDocenteId(Long docenteId) {
		return cursoRepository.findByDocente_Id(docenteId);
	}

	/*
	public List<Alumno> getAlumnosByDocenteId(Long docenteId) {
		List<Curso> cursos = getCursosByDocenteId(docenteId); // Utiliza el nuevo metodo
		List<Alumno> alumnos = new ArrayList<>();

		for (Curso curso : cursos) {
			alumnos.addAll(curso.getAlumnos());
		}
		return alumnos;
	}
	*/


	/*public Optional<List<Alumno>> getAlumnosDeCursosVigentes(Long docenteId) {
		List<Alumno> alumnos = cursoRepository.findAlumnosDeCursosVigentes(docenteId, LocalDate.now());

		// Si no hay alumnos, retornamos un Optional vacío
		if (alumnos.isEmpty()) {
			return Optional.empty();
		}

		// Si hay alumnos, retornamos la lista encapsulada en un Optional
		return Optional.of(alumnos);
	}*/

	public List<Map<String, Object>> getCursosVigentesConAlumnos(Long docenteId) {
		// Obtener la fecha actual
		LocalDate fechaActual = LocalDate.now();
		// Obtener los cursos vigentes usando el metodo del repositorio
		List<Curso> cursosVigentes = cursoRepository.findByDocenteIdAndFechaFinAfter(docenteId, fechaActual);

		return cursosVigentes.stream().map(curso -> {
			Map<String, Object> cursoMap = new HashMap<>();
			cursoMap.put("cursoId", curso.getId());
			cursoMap.put("alumnos", curso.getAlumnos());
			return cursoMap;
		}).collect(Collectors.toList());
	}

}
