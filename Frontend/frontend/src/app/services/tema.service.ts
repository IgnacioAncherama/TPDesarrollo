import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/temas'

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  
    private aux ='http://localhost:8080/api/temas'
  
    constructor(private http: HttpClient) { }
  
    // Obtener todos los Temas
    public getAll(): Observable<Tema[]>{
      return this.http.get<Tema[]>(baseUrl);
    }
  
    // Obtener un Tema por ID
    public getById(id: number):Observable<Tema>{
      return this.http.get<Tema>(`${this.aux}/${id}`);
    }
  
    // Eliminar un Tema por ID
    deleteById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.aux}/${id}`,{ responseType: 'text' as 'json' });
    }
  
    // Modificar un Tema por ID
    updateTema(id: number, Tema: Tema): Observable<Tema> {
      return this.http.put<Tema>(`${this.aux}/${id}`, Tema);
    }
    
    // Crear un nuevo Tema
    create(Tema: Tema): Observable<Tema> {
      return this.http.post<Tema>(this.aux, Tema);
    }
}
  
