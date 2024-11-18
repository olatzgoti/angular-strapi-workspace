import { Component, input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-create-button',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
})
export class CreateButtonComponent  {
  title=input.required<string>()
  currentRoute = ''
  constructor(private router: Router) {
    this.currentRoute = this.router.url
    console.log(this.router.url)


  }

/*   ngOnInit() {

    this.router.events.subscribe (() =>
      this.currentRoute = this.router.url
    )
  } */



}
