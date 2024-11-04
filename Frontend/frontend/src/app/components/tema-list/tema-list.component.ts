import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../models/tema.model';

@Component({
  selector: 'app-tema-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tema-list.component.html',
  styleUrl: './tema-list.component.css'
})
export class TemaListComponent {
  temas: Tema[] = [];
  temaId: number = 0;
  temaNoEncontrado: boolean = false;
  temaSeleccionado: Tema | null = null;
  

  constructor(private temaServices: TemaService){}

  ngOnInit(): void {
    // Cargar todos los temas al iniciar el componente
    this.cargarTodosLosTemas();
  }

  cargarTodosLosTemas(): void {
    this.temaServices.getAll().subscribe({
      next: (data) => {
        this.temas = data;
        this.temaNoEncontrado = false;
      },
      error: () => {
        this.temaNoEncontrado = true;
        this.temas = []; // Limpiar la lista si hay error
      }
    });
  }

  getTemaById(): void {
    if (this.temaId > 0) {
      this.temaServices.getById(this.temaId).subscribe({
        next: (tema) => {
          // Verifica si el tema existe
          if (tema) {
            this.temas = [tema]; // Asignar el tema encontrado
            this.temaNoEncontrado = false; // Si se encuentra, no mostrar mensaje
          } else {
            this.temaNoEncontrado = true; // Si no existe, mostrar mensaje
            //this.temas = []; // Limpiar la lista
            alert('Tema no encontrado'); // Mostrar alerta
          }
        },
        error: () => {
          this.temaNoEncontrado = true; // Mostrar mensaje de error
          this.temas = []; // Limpiar la lista
          alert('Error al ingresar el tema'); // Mostrar alerta
        }
      });
    } else {
      // Si no se ingresó ID, carga todos los temas
      this.cargarTodosLosTemas();
    }
  }

  // Método para eliminar un tema por ID
  deletetemaById(id: number | undefined): void {
    if (id !== undefined) {
      this.temaServices.deleteById(id).subscribe({
        next: () => {
          this.temas = this.temas.filter(tema => tema.id !== id);
          alert('Tema eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar el tema:', err);
          alert('Error al eliminar el tema');
        }
      });
    } else {
      alert('ID de tema no válido');
    }
  }

  // Seleccionar un tema para edición
  seleccionartema(tema: Tema): void {
    this.temaSeleccionado = { ...tema }; // Crea una copia del tema para editar
  }
  // Actualizar los datos del tema
  updateTema(): void {
    if (this.temaSeleccionado && this.temaSeleccionado.id !== undefined) {
      this.temaServices.updateTema(this.temaSeleccionado.id, this.temaSeleccionado).subscribe({
        next: (temaActualizado) => {
          const index = this.temas.findIndex(tema => tema.id === temaActualizado.id);
          if (index !== -1) {
            this.temas[index] = temaActualizado;
          }
          alert('Tema actualizado exitosamente');
          this.temaSeleccionado = null;
        },
        error: (err) => {
          console.error('Error al actualizar el tema:', err);
          alert('Error al actualizar el tema');
        }
      });
    } else {
      alert('El ID del tema no está definido.');
    }
  }
}
