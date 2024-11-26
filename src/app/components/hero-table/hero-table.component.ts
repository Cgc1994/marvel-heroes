import { Component, Input  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Heroe } from '../../models/heroe.model';

@Component({
  selector: 'app-hero-table',
  imports: [MatTableModule],
  templateUrl: './hero-table.component.html',
  styleUrl: './hero-table.component.css'
})
export class HeroTableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: Heroe[] = [];
}
