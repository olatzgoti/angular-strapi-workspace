import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilmExample } from '../filmTypes';
//import { HttpClient } from '@angular/common/http';
import { inject, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HeaderComponent } from '../header/header.component';
import { CreateButtonComponent } from '../create-button/create-button.component';
@Component({
  selector: 'app-films',
  standalone: true,
  imports: [ CommonModule, HeaderComponent, CreateButtonComponent],
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  dataService = inject(DataService);
  router = inject(Router);
  films: FilmExample[] = [];

  ngOnInit() {
    this.fetchFilmData();
  }
  fetchFilmData() {
    {
      this.dataService.getFilmItems().subscribe((response) => {
        console.log(response)
        this.films = response.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          date: item.date? this.inverseDate(item.date) : 'fecha no disponible ',
          title: item.title,
          description: item.description,
          image: item.image,
        }));
      });
    }
  }
  fetchFilmDetailData(documentId: string) {
    this.router.navigate([`/films/${documentId}`]).catch(err => console.error(err));
  /*   this.dataService.getFilmByDocumentId(documentId).subscribe((response) => {
      console.log(response)
    })
    */

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
}

