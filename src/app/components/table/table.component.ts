import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import marvelData  from '../../assets/mock-data/wikipedia_marvel_data.json'; 

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['nameLabel', 'creatorLabel', 'citizenshipLabel', 'genderLabel', 'memberOfLabel', 'occupationLabel', 'skillsLabel'];
  dataSource = new MatTableDataSource(marvelData);

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

}
