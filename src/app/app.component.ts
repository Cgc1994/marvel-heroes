import { Component } from '@angular/core';
import { Heroe } from '../app/models/heroe.model';
import { TableComponent } from '../app/components/table/table.component';
import marvelData  from './assets/mock-data/wikipedia_marvel_data.json'; 

@Component({
  selector: 'app-root',
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  displayedColumns: string[] = ['nameLabel', 'creatorLabel', 'citizenshipLabel', 'genderLabel', 'memberOfLabel', 'occupationLabel', 'skillsLabel'];
  dataSource = marvelData;
}
