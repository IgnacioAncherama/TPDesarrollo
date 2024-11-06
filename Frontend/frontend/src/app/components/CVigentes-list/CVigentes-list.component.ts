import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './CVigentes-list.component.html',
  styleUrl: './CVigentes-list.component.css'
})
export class CVigentesComponent implements OnInit {
  docentes: any[] = [];
  selectedDocenteId: number | null = null; // Almacena el ID del docente seleccionado
  alumnos: any[] = [];
  errorMessage: string | null = null;
  

  constructor(private docenteService: DocenteService) {}

  ngOnInit(): void {
    this.obtenerDocentes();
  }

  obtenerDocentes() {
    this.docenteService.getAll().subscribe({
      next: (docentes) => this.docentes = docentes,
      error: (err) => console.error('Error al cargar docentes:', err),
    });
  }


// Método para manejar el cambio de docente
onDocenteChange() {
  this.alumnos = []; // Reiniciar la lista de alumnos
  this.errorMessage = null; // Limpiar mensaje de error

  if (this.selectedDocenteId) {
    this.obtenerAlumnosDeCursosVigentes();
  }
}

obtenerAlumnosDeCursosVigentes() {
  if (this.selectedDocenteId) {
    this.docenteService.getAlumnosDeCursosVigentes(this.selectedDocenteId).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.alumnos = data.flatMap(curso => curso.alumnos); // Aplanar la lista de alumnos
        this.errorMessage = null; // Limpiar mensaje de error
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener alumnos. Inténtalo de nuevo más tarde.';
        console.error('Error al obtener alumnos:', error);
      }
    });
  }
}


  
  
}