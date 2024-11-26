import { Component } from '@angular/core';
import marvelData  from './assets/mock-data/wikipedia_marvel_data.json'; 
import { HeroTableComponent } from '../app/components/hero-table/hero-table.component';
import { Heroe } from '../app/models/heroe.model';

@Component({
  selector: 'app-root',
  imports: [HeroTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  data: Heroe[] = marvelData;
  columns: string[] = ['nameLabel', 'creatorLabel', 'genderLabel', 'citizenshipLabel', 'memberOfLabel', 'occupationLabel', 'skillsLabel'];

  ngOnInit() {
    console.log(this.data);
  }
  
}
