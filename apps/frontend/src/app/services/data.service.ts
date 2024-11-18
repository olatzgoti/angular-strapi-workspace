import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  getFilmItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/films?populate=*`);
  }

  getCharacterItems(): Observable<any>{
    return this.http.get(`${this.apiUrl}/characters?populate=*`);
  }

  createFilm(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/films`, { data });
  }
  updateFilm(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/films/${id}`, data);
  }
  deleteFilm(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/films/${id}`);
  }


  createCharacter(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/characters`, {data});
  }

  updateCharacter(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/characters/${id}`, data);
  }

 deleteCharacter(id: number): Observable<any> {
   return this.http.delete(`${this.apiUrl}/characters/${id}`);
  }
}
