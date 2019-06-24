import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParentTask } from '../../models/parent-task';
import { TaskService } from '../../services/task.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../models/task';

@Component({
  selector: 'parent-search',
  templateUrl: './parent-search.component.html',
  styleUrls: ['./parent-search.component.scss']
})
export class ParentSearchComponent implements OnInit {

  displayedColumns = ['parentId','parentTask'];
  dataSource = new MatTableDataSource<ParentTask>(); 

  constructor(public dialogRef: MatDialogRef<ParentSearchComponent>,
              @Inject (MAT_DIALOG_DATA) public task: Task,
              public taskService: TaskService, public http: HttpClient) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  filter: ElementRef;
  
  ngOnInit() {
    this.getParentList();
    this.dataSource.paginator = this.paginator;  
    this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRowClicked(row): any {
    this.dialogRef.close(row);    
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {  
      this.dataSource.paginator.firstPage();  
    }  
  }

  getParentList() {

    this.http.get<ParentTask[]>('http://localhost:8091/taskmanager' + '/parentTasks' + '/getTasks')
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<ParentTask>(data);
          this.dataSource.paginator = this.paginator;  
          this.dataSource.sort = this.sort;
        }
      );
    
  }

}