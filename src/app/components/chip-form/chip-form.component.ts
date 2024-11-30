import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, inject, computed, model, signal, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import { Heroe } from '../../../app/models/heroe.model';
import { HeroEvent } from '../../../app/models/heroe.event.model';

@Component({
  selector: 'app-chip-form',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, FormsModule],
  templateUrl: './chip-form.component.html',
  styleUrl: './chip-form.component.css'
})
export class ChipFormComponent {
  @Input() heroesNames: string[] = [];
  @Input() data: Heroe[] = [];

  @Output() heroeAdded = new EventEmitter<HeroEvent>();
  @Output() heroeRemoved = new EventEmitter<HeroEvent>();
  @Output() heroeSelected = new EventEmitter<HeroEvent>();

   private heroesNamesSignal = signal<string[]>([]);
   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
   readonly currentHeroe = model('');
   readonly heroes = signal<string[]>([]);
   readonly filteredHeroes = computed(() => {
    const currentHeroe = this.currentHeroe().toLowerCase();
    return currentHeroe
      ? this.heroesNamesSignal().filter((heroe: string) => heroe.toLowerCase().includes(currentHeroe))
      : this.heroesNamesSignal();
  });

   readonly announcer = inject(LiveAnnouncer);
   dataSource = new MatTableDataSource<Heroe>(this.data);
   private originalData: Heroe[] = [];

   ngOnChanges(changes: SimpleChanges): void {
    this.heroesNamesSignal.set([...this.heroesNames]); 
   }

   add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.heroes.update(heroes => [...heroes, value]);
      this.heroeAdded.emit({ name: value });
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
      this.heroeRemoved.emit({ name: heroe });
      return [...heroes];
    });
    
    if (!this.heroesNames.includes(heroe)) {
      this.heroesNames = [...this.heroesNames, heroe];
    }

    this.currentHeroe.set('');
    this.filterTable();
  }

  selected(event: MatAutocompleteSelectedEvent): void {    
    const selectedHeroe = event.option.viewValue;
    this.heroes.update(heroes => [...heroes, event.option.viewValue]);
    this.heroesNames = this.heroesNames.filter(heroe => heroe !== selectedHeroe);
    this.heroeSelected.emit({ name: selectedHeroe });
    this.currentHeroe.set('');
    event.option.deselect();
    this.filterTable();
  }

  private filterTable(): void {
    const selectedHeroes = this.heroes();
    if (selectedHeroes.length === 0) {
      this.dataSource.data = this.originalData;
    } else {
      this.dataSource.data = this.originalData.filter((item: { nameLabel: string; }) =>
        selectedHeroes.includes(item.nameLabel)
      );
    }
  }

}
