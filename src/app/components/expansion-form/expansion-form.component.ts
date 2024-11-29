import {ChangeDetectionStrategy, Component, EventEmitter, Output, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-expansion-form',
  templateUrl: './expansion-form.component.html',
  styleUrl: './expansion-form.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionFormComponent {
  accordion = viewChild.required(MatAccordion);

  @Output() heroeCreated = new EventEmitter<any>();

  heroe: any = {
    name: '',
    creator: '',
    country: '',
    gender: '',
    memberOf: '',
    occupation: '',
    skills: ''
  };

  createHeroe() {
    this.heroeCreated.emit(this.heroe);
    this.heroe = {
      name: '',
      creator: '',
      country: '',
      gender: '',
      memberOf: '',
      occupation: '',
      skills: ''
    };
    this.accordion().closeAll()
  };
}
