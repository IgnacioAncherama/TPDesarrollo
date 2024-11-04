import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';

const baseUrl = 'http://localhost:8080/api/cursos'
@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private aux ='http://localhost:8080/api/cursos'
  
    constructor(private http: HttpClient) { }
  
    // Obtener todos los Cursos
    public getAll(): Observable<Curso[]>{
      return this.http.get<Curso[]>(baseUrl);
    }
  
    // Obtener un Curso por ID
    public getById(id: number):Observable<Curso>{
      return this.http.get<Curso>(`${this.aux}/${id}`);
    }
  
    // Eliminar un Curso por ID
    deleteById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.aux}/${id}`,{ responseType: 'text' as 'json' });
    }
  
    // Modificar un Curso por ID
    updateCurso(id: number, Curso: Curso): Observable<Curso> {
      return this.http.put<Curso>(`${this.aux}/${id}`, Curso);
    }
    
    // Crear un nuevo Curso
    create(Curso: Curso): Observable<Curso> {
      return this.http.post<Curso>(this.aux, Curso);
    }

    getCursosByFechaFin(fechaFin: string): Observable<Curso[]> {
      return this.http.get<Curso[]>(`${this.aux}/fecha-fin?fecha=${fechaFin}`);
    }
}
