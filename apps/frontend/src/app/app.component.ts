import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  imports: [RouterModule],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
