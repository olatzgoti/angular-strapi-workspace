import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLinkActive, RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent{
  currentRoute = ''

constructor(private router: Router) {
  console.log(this.router.url)
  this.currentRoute = this.router.url
  // this.router.events.subscribe ((res) =>{
  //   console.log(res);
  //   this.currentRoute = this.router.url}
  // )
}
}


