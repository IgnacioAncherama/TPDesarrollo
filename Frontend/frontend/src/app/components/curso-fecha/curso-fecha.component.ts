import { Component } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso-fecha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './curso-fecha.component.html',
  styleUrl: './curso-fecha.component.css'
})
export class CursoFechaComponent {
  fechaFin: Date | null = null; 
  cursos: Curso[] = [];
  errorMessage: string | null = null;
  notFoundMessage: string | null = null; 

  constructor(private cursoService: CursoService) {}

  buscarCursos() {
    this.errorMessage = null;
    this.notFoundMessage = null;

    // Si no se seleccionó una fecha, emite un mensaje y termina el proceso
    if (!this.fechaFin) {
        this.errorMessage = 'Por favor, selecciona una fecha.';
        return; // Finaliza la ejecución del método
    }

    const fechaFinString = new Date(this.fechaFin).toISOString().split('T')[0]; // Formato YYYY-MM-DD

    this.cursoService.getCursosByFechaFin(fechaFinString).subscribe({
        next: (cursos) => {
            this.cursos = cursos;

            // Verificar si no se encontraron cursos
            if (this.cursos.length === 0) {
                this.notFoundMessage = 'No se encontraron cursos en la fecha indicada.';
            }
        },
        error: (error) => {
            this.errorMessage = 'Error al buscar cursos. Inténtalo de nuevo más tarde.';
        }
    });
}

}
