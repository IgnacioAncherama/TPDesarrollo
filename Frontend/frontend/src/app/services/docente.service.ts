import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';

const baseUrl = 'http://localhost:8080/api/docentes'

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private aux ='http://localhost:8080/api/docentes'
  
    constructor(private http: HttpClient) { }
  
    // Obtener todos los Docentes
    public getAll(): Observable<Docente[]>{
      return this.http.get<Docente[]>(baseUrl);
    }
  
    // Obtener un Docente por ID
    public getById(id: number):Observable<Docente>{
      return this.http.get<Docente>(`${this.aux}/${id}`);
    }
  
    // Eliminar un Docente por ID
    deleteById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.aux}/${id}`,{ responseType: 'text' as 'json' });
    }
  
    // Modificar un Docente por ID
    updateDocente(id: number, Docente: Docente): Observable<Docente> {
      return this.http.put<Docente>(`${this.aux}/${id}`, Docente);
    }
    
    // Crear un nuevo Docente
    create(Docente: Docente): Observable<Docente> {
      return this.http.post<Docente>(this.aux, Docente);
    }

    getAlumnosDeCursosVigentes(docenteId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.aux}/${docenteId}/cursosVigentes/alumnos`);
    }
}
