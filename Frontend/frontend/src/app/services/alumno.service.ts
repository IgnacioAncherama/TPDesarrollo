import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';


const baseUrl = 'http://localhost:8080/api/alumnos'

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private aux ='http://localhost:8080/api/alumnos'

  constructor(private http: HttpClient) { }

  // Obtener todos los alumnos
  public getAll(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(baseUrl);
  }

  // Obtener un alumno por ID
  public getById(id: number):Observable<Alumno>{
    return this.http.get<Alumno>(`${this.aux}/${id}`);
  }

  // Eliminar un alumno por ID
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.aux}/${id}`,{ responseType: 'text' as 'json' });
  }

  // Modificar un alumno por ID
  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.aux}/${id}`, alumno);
  }
  
  // Crear un nuevo alumno
  create(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.aux, alumno);
  }
}
