import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule, MatIconModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  //table logic
  @Input() columns: string[] = [];
  @Input() data: any= [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  dataSource = new MatTableDataSource(this.data);
  private originalData = this.data;

  //sort
  private _liveAnnouncer = inject(LiveAnnouncer);

  //dialog
  readonly dialog = inject(MatDialog);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.originalData = this.data;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.originalData = changes['data'].currentValue;
      this.dataSource = new MatTableDataSource(this.originalData);
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openHeroeModal(row: any, event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.localName === 'mat-icon') {
      return;
    }
    this.dialog.open(ModalComponent, {
      width: '400px',
      data: row
    });
  }

  onEdit(element: any): void {
    this.edit.emit(element);
  }

  onDelete(element: any): void {
    this.delete.emit(element);
  }

}
