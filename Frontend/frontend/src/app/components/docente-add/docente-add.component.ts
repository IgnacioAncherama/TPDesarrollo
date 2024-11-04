import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../models/docente.model';

@Component({
  selector: 'app-docente-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './docente-add.component.html',
  styleUrls: ['./docente-add.component.css']  // Corrige 'styleUrl' a 'styleUrls'
})
export class DocenteAddComponent {
  nuevoDocente: Docente = { nombre: '', legajo: 0 };
  docentes: Docente[] = [];

  constructor(private docenteService: DocenteService) {}

  crearDocente(): void {
    // Verificar que el nombre cumpla con las condiciones
    const nombreValido = this.nuevoDocente.nombre && this.nuevoDocente.nombre.length >= 4;
    // Verificar que el legajo sea un número válido y mayor a 0
    const legajoValido = this.nuevoDocente.legajo > 0;

    if (nombreValido && legajoValido) {
      this.docenteService.create(this.nuevoDocente).subscribe({
        next: (docenteCreado) => {
          this.docentes.push(docenteCreado); // Agregar el nuevo docente a la lista
          this.nuevoDocente = { nombre: '', legajo: 0 }; // Reiniciar el formulario
          alert("Docente creado con Éxito");
        },
        error: (e) => {
          console.error('Error al crear el docente:', e);
        }
      });
    } else {
      if (!nombreValido) {
        alert("El nombre debe tener al menos 4 caracteres.");
      }
      if (!legajoValido) {
        alert("El legajo debe ser un número mayor a 0.");
      }
    }
  }
}
