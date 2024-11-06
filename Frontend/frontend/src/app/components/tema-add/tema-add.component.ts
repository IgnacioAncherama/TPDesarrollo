import { Component, OnInit } from '@angular/core';
import { Tema } from '../../models/tema.model';
import { TemaService } from '../../services/tema.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tema-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tema-add.component.html',
  styleUrl: './tema-add.component.css'
})
export class TemaAddComponent {
  nuevoTema: Tema = { nombre: '', descripcion: ''};
  temas: Tema[] = [];

  constructor(private temaService: TemaService){ }

  crearTema(): void {
    if (this.nuevoTema.nombre && this.nuevoTema.descripcion) {
      this.nuevoTema.descripcion = this.nuevoTema.descripcion;
  
      this.temaService.create(this.nuevoTema).subscribe({
        next: (temaCreado) => {
          this.temas.push(temaCreado); // Agregar el nuevo tema a la lista
          this.nuevoTema = { nombre: '', descripcion: ''}; // Reiniciar el formulario
          alert("Tema creado con Exito");
        },
        error: (e) => {
          console.error('Error al crear el tema:', e);
        }
      });
    }
  }
}
