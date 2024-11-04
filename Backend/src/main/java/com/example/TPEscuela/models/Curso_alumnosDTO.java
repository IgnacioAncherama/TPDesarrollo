package com.example.TPEscuela.models;

import java.util.List;

public class Curso_alumnosDTO {

        private Long cursoId;
        private List<Alumno> alumnos;

        // Constructor
        public Curso_alumnosDTO(Long cursoId, List<Alumno> alumnos) {
            this.cursoId = cursoId;
            this.alumnos = alumnos;
        }

        // Getters y setters
        public Long getCursoId() {
            return cursoId;
        }

        public void setCursoId(Long cursoId) {
            this.cursoId = cursoId;
        }

        public List<Alumno> getAlumnos() {
            return alumnos;
        }

        public void setAlumnos(List<Alumno> alumnos) {
            this.alumnos = alumnos;
        }
}
