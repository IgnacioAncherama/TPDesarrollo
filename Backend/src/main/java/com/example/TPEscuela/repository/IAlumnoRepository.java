package com.example.TPEscuela.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.TPEscuela.models.Alumno;

@Repository 
public interface IAlumnoRepository extends JpaRepository <Alumno, Long>{
}