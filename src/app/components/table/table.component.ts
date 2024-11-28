import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy, computed, model, signal} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';

import marvelData  from '../../assets/mock-data/wikipedia_marvel_data.json'; 
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule, MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  //table logic
  displayedColumns: string[] = ['nameLabel', 'creatorLabel', 'citizenshipLabel', 'genderLabel', 'memberOfLabel', 'occupationLabel', 'skillsLabel'];
  dataSource = new MatTableDataSource(marvelData);
  private originalData = marvelData;

  //sort
  private _liveAnnouncer = inject(LiveAnnouncer);

  //chips
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentHeroe = model('');
  readonly heroes = signal<string[]>([]);
  readonly allHeroes = computed(() => marvelData.map(item => item.nameLabel));
  readonly filteredHeroes = computed(() => {
    const currentHeroe = this.currentHeroe().toLowerCase();
    return currentHeroe
      ? this.allHeroes().filter(heroe => heroe.toLowerCase().includes(currentHeroe))
      : this.allHeroes();
  });
  readonly announcer = inject(LiveAnnouncer);

  //dialog
  readonly dialog = inject(MatDialog);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.heroes.update(heroes => [...heroes, value]);
    }
    this.currentHeroe.set('');
    this.filterTable();
  }

  remove(heroe: string): void {
    this.heroes.update(heroes => {
      const index = heroes.indexOf(heroe);
      if (index < 0) {
        return heroes;
      }

      heroes.splice(index, 1);
      this.announcer.announce(`Removed ${heroe}`);
      return [...heroes];
    });
    this.filterTable();
  }

  selected(event: MatAutocompleteSelectedEvent): void {    
    this.heroes.update(heroes => [...heroes, event.option.viewValue]);
    this.currentHeroe.set('');
    event.option.deselect();
    this.filterTable();
  }

  private filterTable(): void {
    const selectedHeroes = this.heroes();
    if (selectedHeroes.length === 0) {
      this.dataSource.data = this.originalData;
    } else {
      this.dataSource.data = this.originalData.filter(item =>
        selectedHeroes.includes(item.nameLabel)
      );
    }
  }

  openHeroeModal(row: any): void {
    this.dialog.open(ModalComponent, {
      width: '400px',
      data: row
    });
  }

}
