package com.example.TPEscuela.repository;

import com.example.TPEscuela.models.Curso;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository 
public interface ICursoRepository extends JpaRepository <Curso, Long>{
        List<Curso> findByFechaFin(LocalDate fechaFin);
        List<Curso> findByDocente_Id(Long docenteId);
        List<Curso> findByDocenteIdAndFechaFinAfterAndFechaInicioBefore(Long docenteId, LocalDate fechaFin, LocalDate fechaInicio);

        /*
        Opciones al para el punto 3:
        @Query("SELECT a FROM Alumno a JOIN a.curso c WHERE c.docente.id = :docenteId AND c.fechaFin > :fechaActual")
        List<Alumno> findAlumnosDeCursosVigentes(@Param("docenteId") Long docenteId, @Param("fechaActual") LocalDate fechaActual);
         */

        List<Curso> findByDocenteIdAndFechaFinAfter(Long docenteId, LocalDate fechaActual);
}
