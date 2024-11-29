import { Component } from '@angular/core';
import { TableComponent } from '../app/components/table/table.component';
import marvelData  from './assets/mock-data/wikipedia_marvel_data.json'; 
import { ChipFormComponent } from '../app/components/chip-form/chip-form.component';
import { ExpansionFormComponent } from '../app/components/expansion-form/expansion-form.component';

@Component({
  selector: 'app-root',
  imports: [TableComponent, ChipFormComponent, ExpansionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  displayedColumns: string[] = ['actions', 'nameLabel', 'creatorLabel', 'citizenshipLabel', 'genderLabel', 'memberOfLabel', 'occupationLabel', 'skillsLabel'];
  dataSource = marvelData;
  private originalData = marvelData;
  heroesNames: string[] = this.originalData.map(item => item.nameLabel);
  selectedHeroes: string[] = [];


  onHeroeAdded(heroe: string): void {
    if (!this.selectedHeroes.includes(heroe)) {
      this.selectedHeroes.push(heroe);
      this.filterDataSource();
    }
  }
  
  onHeroeRemoved(heroe: string): void {
    const index = this.selectedHeroes.indexOf(heroe);
    if (index >= 0) {
      this.selectedHeroes.splice(index, 1);
      this.filterDataSource();
    }
  }
  
  onHeroeSelected(heroe: string): void {
    if (!this.selectedHeroes.includes(heroe)) {
      this.selectedHeroes.push(heroe);
      this.filterDataSource();
    }
  }
  

  private filterDataSource(): void {
    if (this.selectedHeroes.length === 0) {
      this.dataSource = this.originalData;
    } else {
      this.dataSource = this.originalData.filter(item =>
        this.selectedHeroes.includes(item.nameLabel)
      );
    }
  }

  onHeroeCreated(heroe: any) {
    this.originalData = [heroe, ...this.originalData];
    this.dataSource = [heroe, ...this.dataSource];
    this.heroesNames.push(heroe.nameLabel);
  }

  onEdit(element: any): void {
    console.log('Edit clicked', element);
    // Lógica para editar
  }

  onDelete(element: any): void {
    console.log('Delete clicked', element);
    // Lógica para eliminar
  }
  
}
