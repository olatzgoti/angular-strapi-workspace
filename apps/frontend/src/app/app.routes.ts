import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmListComponent } from './film-list/film-list.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { HeaderComponent } from './header/header.component';
import { CreateButtonComponent } from './create-button/create-button.component';
import { CreateFilmComponent } from './create-film/create-film.component';
import { CreateCharacterComponent } from './create-character/create-character.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'films',
    component: FilmListComponent,
  },
  {
    path: 'characters',
    component: CharacterListComponent,
    children: [
    {
      path: 'create',
      component: CreateButtonComponent,
    }
    ]
  },
  {
    path: 'films/new',
    component: CreateFilmComponent,
  },
  {
    path: 'characters/new',
    component: CreateCharacterComponent,

  }
 /*   {
    path: '**',
    redirectTo: 'films',
  }, */
];
