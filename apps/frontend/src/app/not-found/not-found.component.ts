import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
//import { FilmExample } from '../filmexample';
//import { FilmListComponent } from '../film/film.component'

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl:'./not-found.component.html',

  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {

constructor(){
console.log('aaaa')
}
}
