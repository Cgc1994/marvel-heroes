import {ChangeDetectionStrategy, Component, inject, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  readonly dialogRef = inject(MatDialogRef<ModalComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}