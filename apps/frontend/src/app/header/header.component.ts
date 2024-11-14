import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{

  currentRoute = ''

constructor(private router: Router) {}

ngOnInit() {
  this.router.events.subscribe (() =>
    this.currentRoute = this.router.url
  )
}

}


