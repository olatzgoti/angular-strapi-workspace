import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilmExample } from '../filmTypes';
//import { HttpClient } from '@angular/common/http';
import { inject, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HeaderComponent } from '../header/header.component';
import { CreateButtonComponent } from '../create-button/create-button.component';
@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [ CommonModule, HeaderComponent, CreateButtonComponent],
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
})
export class FilmDetailComponent implements OnInit {
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
          date: res.data.date ? this.inverseDate(res.data.date) : 'date not disponible',
          title: res.data.title,
          image: res.data.image,
          createdAt: res.data.createdAt ? this.inverseDate(res.data.createdAt) : 'date not available',
          publishedAt: res.data.publishedAt ? this.inverseDate(res.data.publishedAt) : 'date not available',
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

  inverseDate(date: string) {
    const parts = date.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  toDelete(documentId: string) {
    if (!documentId) {
      console.error('documentId is null or undefined');
      return;
    }
    this.dataService.deleteFilm(documentId).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/']).catch(err => console.error(err));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  toUpdate(documentId: string) {
    if (!documentId) {
      console.error('documentId is null or undefined');
      return;
    }
    this.router.navigate([`/update/${documentId}`]).catch(err => console.error(err));
    };
  }


