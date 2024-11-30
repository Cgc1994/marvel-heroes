import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


import { ModalComponent } from '../modal/modal.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { CommonModule } from '@angular/common';

import { Heroe } from '../../models/heroe.model';
import { ChartData } from '../../models/chart.model';
import { ModalData } from '../../models/modal.model';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule, MatIconModule, FormsModule, BarChartComponent, PieChartComponent, CommonModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  //table logic
  @Input() columns: string[] = [];
  @Input() data: Heroe[] = [];

  @Output() delete = new EventEmitter<Heroe>();
  @Output() edit = new EventEmitter<Heroe>();

  dataSource = new MatTableDataSource<Heroe>(this.data);
  private originalData: Heroe[] = [];

  //sort
  private _liveAnnouncer = inject(LiveAnnouncer);

  //dialog
  readonly dialog = inject(MatDialog);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //chart
  chartData: ChartData[] = [];
  columnName: string = 'creatorLabel';

  ngAfterViewInit() {
    this.originalData = this.data;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort; 
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }     
    this.updateChartData(this.columnName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.originalData = changes['data'].currentValue;
      this.dataSource = new MatTableDataSource(this.originalData);
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      this.updateChartData(this.columnName);
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openHeroeModal(row: Heroe, event: MouseEvent): void {
    const target = event.target as HTMLElement;    
    if (target.localName === 'mat-icon' || target.localName === 'button') {
      return;
    }
    this.dialog.open<ModalComponent, ModalData>(ModalComponent, {
      width: '1000px',
      data: { ...row, disabled: true }
    });
  }

  onEdit(row: Heroe): void {
    const dialogRef = this.dialog.open<ModalComponent, ModalData>(ModalComponent, {
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

  private updateChartData(column: string): void {
    const keyCounts: { [key: string]: number } = {};
    const filteredData = this.dataSource.filteredData;

    filteredData.forEach((row: any) => {
      const country = row[column] || 'Unknown';
      keyCounts[country] = (keyCounts[country] || 0) + 1;
    });

    this.chartData = Object.entries(keyCounts).map(([key, value]) => ({
      key,
      value
    }));    
  }

  handleOptionSelected(selectedOption: string): void {
    this.columnName = '';
    switch(selectedOption) {
      case 'Name':
        this.columnName = 'nameLabel';
        break;
      case 'Creator':
        this.columnName = 'creatorLabel';
        break;
      case 'Country':
        this.columnName = 'citizenshipLabel';
        break;
      case 'Gender':
        this.columnName = 'genderLabel';
        break;
      case 'Member of':
        this.columnName = 'memberOfLabel';
        break;
      case 'Occupation':
        this.columnName = 'occupationLabel';
        break;
      case 'Skills':
        this.columnName = 'skillsLabel';
        break;
      default:
    }

    this.updateChartData(this.columnName);  
    }

}
