import { ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  AfterViewChecked,
  ViewChild,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
 } from "@angular/forms";
//import { Store, StoreModule } from "@ngrx/store";
//import {Store} from '@ngrx/store'
//import { NgForm } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss', ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  //declarations: [CreateFormComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})

export class CreateCharacterComponent {
  dataservice = inject(DataService)
  //store: Store<any> = inject(Store)
  info = new FormControl('')
  currentRoute = ''

  constructor(private router: Router){
    this.currentRoute = this.router.url
  }

  insertCharacterForm = new FormGroup({
    name: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    image: new FormControl<File | null>(null),
  });

  onInsertCharacter(){
    const insertCharacterRequest = this.insertCharacterForm.value;
    console.log(insertCharacterRequest);
    this.dataservice.createCharacter(insertCharacterRequest).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}

