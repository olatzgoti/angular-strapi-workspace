import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core"
import { DataService } from "../services/data.service";
import { CharactersTypes } from "../charactersTypes";
import { HeaderComponent } from "../header/header.component";
import { CreateButtonComponent } from "../create-button/create-button.component";


@Component({
  selector: "app-characters",
  standalone: true,
  host: {  class: "container"},
  imports: [CommonModule, HeaderComponent, CreateButtonComponent],
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.scss"],
})

export class CharacterListComponent implements OnInit {
  dataService = inject(DataService);

  characters: CharactersTypes[] = [];

  ngOnInit() {
    this.fetchCharactersData();
  }
  fetchCharactersData() {
    {
      this.dataService.getCharacterItems().subscribe((response) => {
        console.log(response)
        this.characters = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          documentId: item.documentId,
          image: Array.isArray(item.image) ? item.image : [item.image],
        }));
    });
    }
  }

  toDelete(documentId: string) {
    this.dataService.deleteCharacter(documentId).subscribe((response) => {
      console.log(response)
    })

  }

  /*
  toUpdate(documentId: string), data: any {
    this.dataService.updateCharacter(documentId).subscribe((response) => {
      console.log(response)
    })
  }
  */

}
