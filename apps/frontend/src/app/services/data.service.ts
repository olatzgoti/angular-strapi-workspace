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
}
