import { Component } from '@angular/core';
import { TableComponent } from '../app/components/table/table.component';
import marvelData  from './assets/mock-data/wikipedia_marvel_data.json'; 
import { ChipFormComponent } from '../app/components/chip-form/chip-form.component';
import { ExpansionFormComponent } from '../app/components/expansion-form/expansion-form.component';

import { Heroe } from '../app/models/heroe.model';

@Component({
  selector: 'app-root',
  imports: [TableComponent, ChipFormComponent, ExpansionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  displayedColumns: string[] = ['actions', 'nameLabel', 'creatorLabel', 'citizenshipLabel', 'genderLabel', 'memberOfLabel', 'occupationLabel', 'skillsLabel'];
  dataSource: Heroe[] = marvelData;
  private originalData: Heroe[] = marvelData;
  heroesNames: string[] = this.originalData.map(item => item.nameLabel);
  selectedHeroes: string[] = [];

  constructor() {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedData = localStorage.getItem('marvelData');
      if (savedData) {
        this.originalData = JSON.parse(savedData);
        this.dataSource = this.originalData;
      } else {
        this.originalData = marvelData;
        this.dataSource = this.originalData;
      }
    } else {
      this.originalData = marvelData;
      this.dataSource = this.originalData;
    }

    this.heroesNames = this.originalData.map(item => item.nameLabel);
  }


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
    this.saveToLocalStorage();
  }

  onEdit(element: any): void {
    const index = this.originalData.findIndex(item => item.nameLabel === element.originalHeroe.nameLabel);
    if (index >= 0) {
      this.originalData[index] = element.data;
      this.dataSource = [...this.originalData];
      this.saveToLocalStorage();
    }
  }

  onDelete(element: any): void {
    const index = this.originalData.findIndex(item => item.nameLabel === element.nameLabel);
    if (index >= 0) {
      this.originalData.splice(index, 1);
      this.dataSource = [...this.originalData];
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('marvelData', JSON.stringify(this.originalData));
  }
  
}
