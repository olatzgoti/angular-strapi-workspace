import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmListComponent } from './film-list/film-list.component';
import { CharacterListComponent } from './character-list/character-list.component';



export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'films',
        component: FilmListComponent,
      },
      {
        path: 'characters',
        component: CharacterListComponent,
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'films',
  },
];
