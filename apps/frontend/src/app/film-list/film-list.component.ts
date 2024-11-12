import { CommonModule } from '@angular/common';
import { FilmExample } from '../filmTypes';
//import { HttpClient } from '@angular/common/http';
import { inject, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
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
          title: item.title,
          description: item.description,
          image: item.image,
        }));
      });
    }
  }
}
