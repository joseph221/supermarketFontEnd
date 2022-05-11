import { AfterViewInit, ChangeDetectionStrategy, Component,EventEmitter,Input,OnChanges,OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableserviceService } from '../../services/tableservice.service';
import { TableColumns } from './tableColumns';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit,AfterViewInit,OnChanges {
  public tableDataSource = new MatTableDataSource<any>();
  public displayedColumns!: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns!: TableColumns[];
  @Input() rowActionIcon!: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<number> = new EventEmitter<number>();
  @Output() rowAction2: EventEmitter<number> = new EventEmitter<number>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any) {
    this.setTableDataSource(data);
  }

  constructor(private tableservice: TableserviceService) {
    
  }
  ngOnChanges(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumns) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon,...columnNames]
    } else {
      this.displayedColumns = columnNames;
    }
  }


  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumns) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon,...columnNames]
    } else {
      this.displayedColumns = columnNames;
    }
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column?.name === sortParameters?.active)?.dataKey!;
    this.sort.emit(sortParameters);
  }

  delete(id: number){
    this.rowAction.emit(id);
  }
  edit(id:number){
    this.rowAction2.emit(id);
  }
  update(data: any){
    this.tableservice.UpdateUser(data);
  }

  getbyId(id:number){
    this.tableservice.UpdateUser(id);
  } 
  


 
}

