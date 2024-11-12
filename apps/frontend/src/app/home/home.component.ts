import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
//import { FilmExample } from '../filmexample';
//import { FilmListComponent } from '../film/film.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  template:`<app-header></app-header>

  <article>
  <section>
  <p>Home component: Finally available for you</p>

  <router-outlet></router-outlet>

  <section class ='home'>

  </section>
  </section>
  </article>`,
  //'./home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

constructor(){
console.log('aaaa')
}
}
