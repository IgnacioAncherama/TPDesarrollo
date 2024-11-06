package com.example.TPEscuela.services;

import java.util.*;
import java.time.LocalDate;
import java.util.stream.Collectors;

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

	public List<Map<String, Object>> getCursosVigentesConAlumnos(Long docenteId) {
		LocalDate fechaActual = LocalDate.now();
		List<Curso> cursosVigentes = cursoRepository.findByDocenteIdAndFechaFinAfter(docenteId, fechaActual);

		return cursosVigentes.stream().map(curso -> {
			Map<String, Object> cursoMap = new HashMap<>();
			cursoMap.put("cursoId", curso.getId());
			cursoMap.put("alumnos", curso.getAlumnos());
			return cursoMap;
		}).collect(Collectors.toList());
	}

}
