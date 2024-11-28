import { Component } from '@angular/core';
import { Heroe } from '../app/models/heroe.model';
import { TableComponent } from '../app/components/table/table.component';

@Component({
  selector: 'app-root',
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
}
