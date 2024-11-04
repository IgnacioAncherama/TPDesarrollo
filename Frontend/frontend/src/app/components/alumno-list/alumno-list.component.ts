import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../services/alumno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {
  alumnos: Alumno[] = [];
  alumnoId: number = 0;
  alumnoNoEncontrado: boolean = false;
  alumnoSeleccionado: Alumno | null = null;
  

  constructor(private alumnosService: AlumnoService) {}

  ngOnInit(): void {
    // Cargar todos los alumnos al iniciar el componente
    this.cargarTodosLosAlumnos();
  }

  cargarTodosLosAlumnos(): void {
    this.alumnosService.getAll().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.alumnoNoEncontrado = false;
      },
      error: () => {
        this.alumnoNoEncontrado = true;
        this.alumnos = []; // Limpiar la lista si hay error
      }
    });
  }

  getAlumnoById(): void {
    if (this.alumnoId > 0) {
      this.alumnosService.getById(this.alumnoId).subscribe({
        next: (alumno) => {
          if (alumno) {
            this.alumnos = [alumno]; 
            this.alumnoNoEncontrado = false;
          } else {
            this.alumnoNoEncontrado = true; 
            alert('Alumno no encontrado'); 
          }
        },
        error: () => {
          this.alumnoNoEncontrado = true; 
          this.alumnos = [];
          alert('Error al ingresar el Alumno'); 
        }
      });
    } else {
      // Si no se ingresó ID, carga todos los alumnos
      this.cargarTodosLosAlumnos();
    }
  }

  // Método para eliminar un alumno por ID
  deleteAlumnoById(id: number | undefined): void {
    if (id !== undefined) {
      this.alumnosService.deleteById(id).subscribe({
        next: () => {
          this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
          alert('Alumno eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar el alumno:', err);
          alert('Error al eliminar el alumno');
        }
      });
    } else {
      alert('ID de alumno no válido');
    }
  }

  // Seleccionar un alumno para edición
  seleccionarAlumno(alumno: Alumno): void {
    this.alumnoSeleccionado = { ...alumno }; 
    // Crea una copia del alumno para editar
  }
  
  // Actualizar los datos del alumno
  updateAlumno(): void {
    if (this.alumnoSeleccionado && this.alumnoSeleccionado.id !== undefined) {
      this.alumnosService.updateAlumno(this.alumnoSeleccionado.id, this.alumnoSeleccionado).subscribe({
        next: (alumnoActualizado) => {
          const index = this.alumnos.findIndex(alumno => alumno.id === alumnoActualizado.id);
          if (index !== -1) {
            this.alumnos[index] = alumnoActualizado;
          }
          alert('Alumno actualizado exitosamente');
          this.alumnoSeleccionado = null;
        },
        error: (err) => {
          console.error('Error al actualizar el alumno:', err);
          alert('Error al actualizar el alumno');
        }
      });
    } else {
      alert('El ID del alumno no está definido.');
    }
  }
  
}
