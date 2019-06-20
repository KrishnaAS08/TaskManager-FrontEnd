import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { ParentTask } from '../../models/parent-task';
import { MatDialog } from '@angular/material';
import { ParentSearchComponent } from '../../dialog/parent-search/parent-search.component';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'add-task',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  task: Task = new Task();
  isParent: boolean = false;
  max = 30;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;

  parentTask: ParentTask = new ParentTask();
  parentTaskList: ParentTask[] = [];

  constructor(public dialog: MatDialog, private taskService: TaskService) { }

  formControl = new FormControl('', [
    Validators.required
    ]);
  ngOnInit() {
    this.task.startDate = new Date();
    this.task.endDate = new Date((this.task.startDate.getTime() + 86400000));
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field':'';
  }

  saveTask() {
    if(this.isParent) {
      this.parentTask.parentTaskName = this.task.taskName;
      this.taskService.addParentTask(this.parentTask)
        .subscribe(data => console.log('ParentTask>>>',data), error => console.log(error));
      this.parentTask = new ParentTask();
      this.task = new Task();
    }
    else {
      this.task.status = 'not-completed';
      this.taskService.addTask(this.task)
        .subscribe(data => console.log('Task>>>',data), error => console.log(error));
      this.task = new Task();
    }
    
    this.isParent = false;
  }
  getParentList() :Observable<any>{
    const dialogRef = this.dialog.open(ParentSearchComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.parentTask = result;
        this.task.parentId = result.parentId;
      }
  });
    return dialogRef.afterClosed();
  }

  onSubmit() {    
    this.saveTask();
  }

  onClick() {
    this.isParent = !this.isParent;
  }

}
