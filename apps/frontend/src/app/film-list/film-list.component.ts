import { CommonModule } from '@angular/common';
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
  inverseDate(date: string) {
    const parts = date.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
}
/* ngOnInit() {
  this.router.events.subscribe (() =>
    this.currentRoute = this.router.url
  ) */
