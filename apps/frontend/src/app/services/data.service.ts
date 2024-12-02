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

  getFilmByDocumentId(documentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/films/${documentId}?populate=*`);
  }

  getCharacterItems(): Observable<any>{
    return this.http.get(`${this.apiUrl}/characters?populate=*`);
  }

  createFilm(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/films`, {data});
  }
  updateFilm(documentId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/films/${documentId}`, {data});
  }

  deleteFilm(documentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/films/${documentId}`);
  }


  createCharacter(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/characters`, {data});
  }

  updateCharacter(documentId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/characters/${documentId}`, {data});
  }

 deleteCharacter(documentId: string): Observable<any> {
   return this.http.delete(`${this.apiUrl}/characters/${documentId}`);
  }
}
