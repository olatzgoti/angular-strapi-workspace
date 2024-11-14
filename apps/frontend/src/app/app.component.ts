import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common'
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from './home/home.component';
import { FilmListComponent } from './film-list/film-list.component';
import { CharacterListComponent } from './character-list/character-list.component';

@Component({
  imports: [RouterModule, HeaderComponent, HomeComponent, FilmListComponent, CharacterListComponent, NgIf],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  currentRoute = '';

  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe(() =>
     {
       this.currentRoute = this.router.url;
     }
    )
 } }
/*  ngOnInit() {
  this.router.events.subscribe (() =>
    this.currentRoute = this.router.url
  )
} */
