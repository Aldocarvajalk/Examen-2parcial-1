import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta, Recetas } from '../interface/recetas';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  URL = 'http://localhost:3000/api/receta'
  constructor(private http:HttpClient) { }

  getRescetas(): Observable<Recetas>{
    return this.http.get<Recetas>(`${this.URL}`)
  }

  postRecetas(newReceta:Receta):Observable<Receta>{
    return this.http.post<Receta>(`${this.URL}`, newReceta)
  }

  putReceta(id:string, newReceta:Receta):Observable<Receta>{
    return this.http.put<Receta>(`${this.URL}/${id}`, newReceta)
  }

  deleteReceta(id:string):Observable<Receta>{
    return this.http.delete<Receta>(`${this.URL}/${id}`)
  }
}
