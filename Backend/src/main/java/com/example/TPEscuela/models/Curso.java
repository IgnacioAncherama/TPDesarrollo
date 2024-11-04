package com.example.TPEscuela.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

// http://localhost:8082/api/cursos
// LO QUE HACE ES UN JOIN, POR LO TANTO TEMA Y DOCENTE DEBEN ESTAR EN LA BASE DE DATOS

@Entity
@Table (name= "Curso")
public class Curso {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;

	@Column(name= "fechaInicio")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate fechaInicio;
	
	@Column(name= "fechaFin")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate fechaFin;
	
	@Column(name= "precio")
	private Double precio;
	
	@ManyToOne
    @JoinColumn(name = "Tema_id", referencedColumnName = "id")
    private Tema tema;

    @ManyToOne
    @JoinColumn(name = "Docente_id", referencedColumnName = "id")
    private Docente docente;

	@ManyToMany(fetch = FetchType.EAGER)  // SEGUN SERGIO: @ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "curso_alumno",
			joinColumns = @JoinColumn(name = "curso_id"),
			inverseJoinColumns = @JoinColumn(name = "alumno_id")
	)

	private List<Alumno> alumnos = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public LocalDate getfechaInicio() {
		return fechaInicio;
	}

	public LocalDate getfechaFin() {
		return fechaFin;
	}

	public Double getPrecio() {
		return precio;
	}

	public Tema getTema() {
		return tema;
	}

	public Docente getDocente() {
		return docente;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setfechaInicio(LocalDate fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public void setfechaFin(LocalDate fechaFin) {
		this.fechaFin = fechaFin;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public void setTema(Tema tema) {
		this.tema = tema;
	}

	public void setDocente(Docente docente) {
		this.docente = docente;
	}

	public List<Alumno> getAlumnos() {
		return alumnos;
	}

	public void setAlumnos(List<Alumno> alumnos) {
		this.alumnos = alumnos;
	}

}
