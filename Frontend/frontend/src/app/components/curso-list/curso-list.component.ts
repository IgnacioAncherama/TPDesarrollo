import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Curso } from '../../models/curso.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso.service';
import { DocenteService } from '../../services/docente.service';
import { AlumnoService } from '../../services/alumno.service';
import { TemaService } from '../../services/tema.service';
import { Docente } from '../../models/docente.model';
import { Alumno } from '../../models/alumno.model';
import { Tema } from '../../models/tema.model';


@Component({
  selector: 'app-curso-list',
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos: Curso[] = [];
  cursoId: number = 0;
  cursoNoEncontrado: boolean = false;
  cursoSeleccionado: Curso | null = null;
  
  docentes: Docente[] = [];
  alumnos: Alumno[] = [];
  temas: Tema[] = [];

  alumnosDisponibles: Alumno[] = [];
  alumnoSeleccionadoEliminar: number | null = null;
  alumnoSeleccionadoAgregar: number | null = null;

  constructor(private cursoService: CursoService,
              private docenteService: DocenteService,
              private alumnoService: AlumnoService,
              private temaService: TemaService
  ) {}

  ngOnInit(): void {
    // Cargar todos los cursos al iniciar el componente
    this.cargarTodosLosCursos();
  }

  cargarTodosLosCursos(): void {
    this.cursoService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.cursos = data;
        this.cursoNoEncontrado = false;
      },
      error: () => {
        this.cursoNoEncontrado = true;
        this.cursos = []; // Limpiar la lista si hay error
      }
    });
  }


  
  getCursoById(): void {
    if (this.cursoId > 0) {
      this.cursoService.getById(this.cursoId).subscribe({
        next: (curso) => {
          // Verifica si el curso existe
          console.log(curso);
          if (curso) {
            this.cursos = [curso]; // Asignar el curso encontrado
            this.cursoNoEncontrado = false; // Si se encuentra, no mostrar mensaje
          } else {
            this.cursoNoEncontrado = true; // Si no existe, mostrar mensaje
            //this.cursos = []; // Limpiar la lista
            alert('Curso no encontrado'); // Mostrar alerta
          }
        },
        error: () => {
          this.cursoNoEncontrado = true; // Mostrar mensaje de error
          this.cursos = []; // Limpiar la lista
          alert('Error al ingresar el Curso'); // Mostrar alerta
        }
      });
    } else {
      // Si no se ingresó ID, carga todos los cursos
      this.cargarTodosLosCursos();
    }
  }

  // Método para eliminar un curso por ID
  deleteCursoById(id: number | undefined): void {
    if (id !== undefined) {
      this.cursoService.deleteById(id).subscribe({
        next: () => {
          this.cursos = this.cursos.filter(curso => curso.id !== id);
          alert('Curso eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar el curso:', err);
          alert('Error al eliminar el curso');
        }
      });
    } else {
      alert('ID de curso no válido');
    }
  }

  cargarDatosRelacionados(): void {
    this.docenteService.getAll().subscribe({
      next: (docentes) => this.docentes = docentes
    });
    this.alumnoService.getAll().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
        this.filtrarAlumnosDisponibles(); // Filtra alumnos que ya están en el curso
      }
    });
    this.temaService.getAll().subscribe({
      next: (temas) => this.temas = temas
    });
  }

  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado = { ...curso };
    this.cargarDatosRelacionados();
  }

  updateCurso(): void {
    if (this.cursoSeleccionado && this.cursoSeleccionado.id !== undefined) {
      this.cursoService.updateCurso(this.cursoSeleccionado.id, this.cursoSeleccionado).subscribe({
        next: (cursoActualizado) => {
          const index = this.cursos.findIndex(curso => curso.id === cursoActualizado.id);
          if (index !== -1) {
            this.cursos[index] = cursoActualizado;
          }
          alert('Curso actualizado exitosamente');
          this.cursoSeleccionado = null;
        },
        error: (err) => {
          console.error('Error al actualizar el curso:', err);
          alert('Error al actualizar el curso');
        }
      });
    } else {
      alert('El ID del curso no está definido.');
    }
  }

  eliminarAlumno() {
    if (this.alumnoSeleccionadoEliminar) {
      // Buscar el alumno seleccionado por ID
      const alumnoId = this.alumnoSeleccionadoEliminar;
      const alumnoIndex = this.cursoSeleccionado!.alumnos.findIndex(a => a.id === alumnoId);
  
      if (alumnoIndex !== -1) {
        // Eliminar el alumno del array
        this.cursoSeleccionado!.alumnos.splice(alumnoIndex, 1);
  
        // Enviar la actualización al backend
        this.cursoService.updateCurso(this.cursoSeleccionado!.id, this.cursoSeleccionado!).subscribe(
          (updatedCurso) => {
            // Recargar la lista de cursos después de la actualización
            this.cargarTodosLosCursos();
            // Limpiar selección
            this.alumnoSeleccionadoEliminar = null;
          },
          (error) => {
            console.error('Error al eliminar alumno:', error);
          }
        );
      }
    }
  }
  

  agregarAlumno() {
    if (this.alumnoSeleccionadoAgregar) {
      const alumnoId = this.alumnoSeleccionadoAgregar;
      const alumno = this.alumnosDisponibles.find(a => a.id === alumnoId);
  
      if (alumno) {
        // Añadir el alumno al curso seleccionado
        this.cursoSeleccionado!.alumnos.push(alumno);
  
        // Enviar la actualización al backend
        this.cursoService.updateCurso(this.cursoSeleccionado!.id, this.cursoSeleccionado!).subscribe(
          (updatedCurso) => {
            // Recargar la lista de cursos después de la actualización
            this.cargarTodosLosCursos();
            // Limpiar selección
            this.alumnoSeleccionadoAgregar = null;
          },
          (error) => {
            console.error('Error al agregar alumno:', error);
          }
        );
      }
    }
  }
  

  filtrarAlumnosDisponibles(): void {
    if (this.cursoSeleccionado) {
      this.alumnosDisponibles = this.alumnos.filter(
        alumno => !this.cursoSeleccionado?.alumnos.some(a => a.id === alumno.id)
      );
    }
  }
}
