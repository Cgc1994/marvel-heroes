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
import { BarChartComponent } from '../bar-chart/bar-chart.component';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule, MatIconModule, FormsModule, BarChartComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  //table logic
  @Input() columns: string[] = [];
  @Input() data: any= [];

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  dataSource = new MatTableDataSource(this.data);
  private originalData = this.data;

  //sort
  private _liveAnnouncer = inject(LiveAnnouncer);

  //dialog
  readonly dialog = inject(MatDialog);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  //chart
  chartData: { key: string, value: number }[] = [];

  ngAfterViewInit() {
    this.originalData = this.data;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;   
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.originalData = changes['data'].currentValue;
      this.dataSource = new MatTableDataSource(this.originalData);
      this.dataSource.sort = this.sort;
      this.updateChartData();
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
    if (target.localName === 'mat-icon' || target.localName === 'button') {
      return;
    }
    this.dialog.open(ModalComponent, {
      width: '1000px',
      data: { ...row, disabled: true }
    });
  }

  onEdit(row: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '1000px',
      data: { ...row, disabled: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.edit.emit(result);
      }
    });
  }

  onDelete(element: any): void {
    this.delete.emit(element);
  }

  private updateChartData(): void {
    const countryCounts: { [key: string]: number } = {};
    const filteredData = this.dataSource.filteredData;

    filteredData.forEach((row: any) => {
      const country = row.citizenshipLabel || 'Unknown';
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    this.chartData = Object.entries(countryCounts).map(([key, value]) => ({
      key,
      value
    }));    
  }

}
