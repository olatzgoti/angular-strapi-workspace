import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilmExample } from '../filmTypes';
//import { HttpClient } from '@angular/common/http';
import { inject, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HeaderComponent } from '../header/header.component';
import { CreateButtonComponent } from '../create-button/create-button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
 } from "@angular/forms";

@Component({
  selector: 'app-film-update',
  standalone: true,
  imports: [ CommonModule, HeaderComponent, CreateButtonComponent],
  templateUrl: './film-update.component.html',
  styleUrls: ['./film-update.component.scss'],
})
export class FilmUpdateComponent implements OnInit {
  dataService = inject(DataService);
  router = inject(Router);
  film: Partial<FilmExample> = {
    id: 0,
    documentId:'',
    date:'',
    title:'',
    image:[],
    publishedAt: '',
    createdAt: '',
    filmId: '',
  }

  fetchFilmData(documentId:string) {
    {
      this.dataService.getFilmByDocumentId(documentId).subscribe((res) => {
      console.log(res.data)
        this.film = {
          id: res.data.id,
          documentId: res.data.documentId,
          date: res.data.date, //? this.inverseDate(res.data.date) : 'date not disponible',
          title: res.data.title,
          image: res.data.image,
          createdAt: res.data.createdAt, //? this.inverseDate(res.data.createdAt) : 'date not available',
          publishedAt: res.data.publishedAt //? this.inverseDate(res.data.publishedAt) : 'date not available',
        };

   /*      res.data = this.film
        this.film = res.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          //date: //item.date?,// this.inverseDate(item.date) : 'fecha no disponible ',
          title: item.title,
          image: item.image,
        })); */
        });
    }
  }

  ngOnInit() {
    const documentId = this.router.url.split('/').pop();
    if (!documentId) {
      console.error('documentId is null or undefined');
      return;
    }
    this.fetchFilmData(documentId);
  }

insertUpdateFilmForm = new FormGroup({
    title: new FormControl<string | null>(null),
    filmId: new FormControl<string | null>(null),
    image: new FormControl<File | null>(null),
  });

onUpdateFilmForm(data: any) {
    const updateFilmRequest = this.insertUpdateFilmForm.value
    console.log(updateFilmRequest);
    this.dataService.updateFilm(data.documentId, updateFilmRequest).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
}

  updateFilmForm(documentId: string, data: any) {
    return this.dataService.updateFilm(documentId, data).subscribe({
  next: (response) => {
    console.log(response);
    this.router.navigate(['/']).catch(err => console.error(err));
  },
  error: (error) => {
    console.error(error);
  },
  })
  }
}
