import { Component } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumno-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './alumno-add.component.html',
  styleUrls: ['./alumno-add.component.css']
})
export class AlumnoAddComponent {
  nuevoAlumno: Alumno = { nombre: '', fechaNacimiento: new Date() };
  alumnos: Alumno[] = [];
  errorMessage: string = "";

  constructor(private alumnosService: AlumnoService) {}

  // Método para crear un nuevo alumno
  crearAlumno(): void {
    const fechaActual = new Date();

    // Verificar que el nombre y la fecha de nacimiento estén presentes
    if (this.nuevoAlumno.nombre && this.nuevoAlumno.fechaNacimiento) {
        const fechaNacimiento = new Date(this.nuevoAlumno.fechaNacimiento);

        // Validar que la fecha de nacimiento no sea mayor a la fecha actual
        if (fechaNacimiento > fechaActual) {
            alert("La fecha de nacimiento no puede ser mayor a la fecha actual.");
            return;
        }

        this.alumnosService.create(this.nuevoAlumno).subscribe({
            next: (alumnoCreado) => {
                this.alumnos.push(alumnoCreado); // Agregar el nuevo alumno a la lista
                this.nuevoAlumno = { nombre: '', fechaNacimiento: new Date }; // Reiniciar el formulario
                alert("Alumno creado con éxito");
            },
            error: (e) => {
                console.error('Error al crear el alumno:', e);
            }
        });
    } else {
        alert("Por favor, complete todos los campos obligatorios.");
    }
}

}