import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso.service';
import { DocenteService } from '../../services/docente.service';
import { AlumnoService } from '../../services/alumno.service';
import { TemaService } from '../../services/tema.service';
import { Docente } from '../../models/docente.model';
import { Alumno } from '../../models/alumno.model';
import { Tema } from '../../models/tema.model';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-curso-add',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {
  nuevoCurso: Curso;
  alumnosDisponibles: Alumno[] = [];
  alumnos: Alumno[] = [];
  docentes: Docente[] = [];
  temas: Tema[] = [];
  alumnoSeleccionadoEliminar: number | undefined; // Para el alumno a eliminar
  alumnoSeleccionadoAgregar: number | undefined; // Para el alumno a agregar

  constructor(
    private cursoService: CursoService,
    private docenteService: DocenteService,
    private alumnoService: AlumnoService,
    private temaService: TemaService
  ) {
    this.nuevoCurso = new Curso(); // Inicializar nuevoCurso
  }

  ngOnInit(): void {
    this.cargarDatosRelacionados();
  }

  cargarDatosRelacionados(): void {
    this.docenteService.getAll().subscribe({
      next: (docentes) => this.docentes = docentes,
      error: (err) => console.error('Error al cargar docentes:', err)
    });
    this.alumnoService.getAll().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
        this.filtrarAlumnosDisponibles();
      },
      error: (err) => console.error('Error al cargar alumnos:', err)
    });
    this.temaService.getAll().subscribe({
      next: (temas) => this.temas = temas,
      error: (err) => console.error('Error al cargar temas:', err)
    });
  }

  agregarCurso(): void {
    this.cursoService.create(this.nuevoCurso).subscribe({
      next: (cursoCreado) => {
        alert('Curso agregado exitosamente');
        this.nuevoCurso = new Curso();
        this.filtrarAlumnosDisponibles(); // Reiniciar los alumnos disponibles
      },
      error: (err) => {
        console.error('Error al agregar el curso:', err);
        alert('Error al agregar el curso');
      }
    });
  }

  agregarAlumno(alumnoId: number | undefined): void {
    const alumno = this.alumnosDisponibles.find(a => a.id === alumnoId);
    if (alumno) {
      this.nuevoCurso.alumnos.push(alumno);
      this.filtrarAlumnosDisponibles(); // Actualiza la lista de alumnos disponibles
    }
  }

  eliminarAlumno(): void {
    if (this.alumnoSeleccionadoEliminar) {
      this.nuevoCurso.alumnos = this.nuevoCurso.alumnos.filter(a => a.id !== this.alumnoSeleccionadoEliminar);
      this.filtrarAlumnosDisponibles(); // Actualiza la lista de alumnos disponibles
      this.alumnoSeleccionadoEliminar = undefined; // Reiniciar la selección
    }
  }

  filtrarAlumnosDisponibles(): void {
    this.alumnosDisponibles = this.alumnos.filter(
      alumno => !this.nuevoCurso.alumnos.some(a => a.id === alumno.id)
    );
  }
}
