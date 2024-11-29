import {ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatInputModule, CommonModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  originalHeroe: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.originalHeroe = {...data};
  }

  editHeroe() {
    this.dialogRef.close({ originalHeroe: this.originalHeroe, data: this.data });
  }
}