import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/docente.service';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './docente-list.component.html',
  styleUrl: './docente-list.component.css'
})
export class DocenteListComponent {
    docentes: Docente[] = [];
    docenteId: number = 0;
    docenteNoEncontrado: boolean = false;
    docenteSeleccionado: Docente | null = null;
    
  
    constructor(private docenteServices: DocenteService,
                private cursoService: CursoService
    ){}
  
    ngOnInit(): void {
      // Cargar todos los docentes al iniciar el componente
      this.cargarTodosLosDocentes();
    }
  
    cargarTodosLosDocentes(): void {
      this.docenteServices.getAll().subscribe({
        next: (data) => {
          this.docentes = data;
          this.docenteNoEncontrado = false;
        },
        error: () => {
          this.docenteNoEncontrado = true;
          this.docentes = []; // Limpiar la lista si hay error
        }
      });
    }
  
    getDocenteById(): void {
      if (this.docenteId <= 0){
        alert('El ID debe ser mayor a 0');
        return;
      }
      if (this.docenteId > 0) {
        this.docenteServices.getById(this.docenteId).subscribe({
          next: (docente) => {
            // Verifica si el docente existe
            if (docente) {
              this.docentes = [docente]; // Asignar el docente encontrado
              this.docenteNoEncontrado = false; // Si se encuentra, no mostrar mensaje
            } else {
              this.docenteNoEncontrado = true; // Si no existe, mostrar mensaje
              //this.docentes = []; // Limpiar la lista
              alert('Docente no encontrado'); // Mostrar alerta
            }
          },
          error: () => {
            this.docenteNoEncontrado = true; // Mostrar mensaje de error
            this.docentes = []; // Limpiar la lista
            alert('Error al ingresar el docente'); // Mostrar alerta
          }
        });
      } else {
        // Si no se ingresó ID, carga todos los docentes
        this.cargarTodosLosDocentes();
      }
    }
  
    // Método para eliminar un docente por ID
deleteDocenteById(id: number | undefined): void {
  if (id !== undefined) {
    // Primero, verifica si el docente está asociado a algún curso
    this.cursoService.getAll().subscribe({
      next: (cursos) => {
        const docenteEnCurso = cursos.some(curso => curso.docente.id === id);
        
        if (docenteEnCurso) {
          alert('No se puede eliminar el docente porque está asociado a uno o más cursos.');
        } else {
          // Si el docente no está asociado a ningún curso, procede con la eliminación
          this.docenteServices.deleteById(id).subscribe({
            next: () => {
              this.docentes = this.docentes.filter(docente => docente.id !== id);
              alert('Docente eliminado correctamente');
            },
            error: (err) => {
              console.error('Error al eliminar el docente:', err);
              alert('Error al eliminar el docente');
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar los cursos:', err);
        alert('Error al verificar los cursos del docente.');
      }
    });
  } else {
    alert('ID de docente no válido');
  }
}

    
    // Seleccionar un docente para edición
    seleccionarDocente(docente: Docente): void {
      this.docenteSeleccionado = { ...docente }; // Crea una copia del docente para editar
    }
  
    // Actualizar los datos del docente
    updateDocente(): void {
      if (this.docenteSeleccionado && this.docenteSeleccionado.id !== undefined) {
        // Validar que legajo sea un número válido
        if (typeof this.docenteSeleccionado.legajo !== 'number' || isNaN(this.docenteSeleccionado.legajo) || this.docenteSeleccionado.legajo < 0 || this.docenteSeleccionado.legajo == 0) {
          alert('El legajo debe ser un número válido.');
          return;
        }
    
        this.docenteServices.updateDocente(this.docenteSeleccionado.id, this.docenteSeleccionado).subscribe({
          next: (docenteActualizado) => {
            const index = this.docentes.findIndex(docente => docente.id === docenteActualizado.id);
            if (index !== -1) {
              this.docentes[index] = docenteActualizado;
            }
            alert('Docente actualizado exitosamente');
            this.docenteSeleccionado = null;
          },
          error: (err) => {
            console.error('Error al actualizar el docente:', err);
            alert('Error al actualizar el docente');
          }
        });
      } else {
        alert('El ID del docente no está definido.');
      }
  } 

}
