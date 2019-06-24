import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
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
  myForm: FormGroup;

  parentTask: ParentTask = new ParentTask();
  parentTaskList: ParentTask[] = [];

  constructor(public dialog: MatDialog, private taskService: TaskService,private fb: FormBuilder) {

    this.myForm = fb.group({
      'name': ['', Validators.required],
      'priority': [null, Validators.required],
      'parentTask':null,
      'startDate': new Date(),
      'endDate': new Date(new Date().getTime() +86400000),
      'isParent': false
    })
  }

  
  ngOnInit() {
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
    if(this.isParent) {
      this.parentTask.parentTaskName = this.myForm.value.name;
      this.taskService.addParentTask(this.parentTask).subscribe();
      this.parentTask = new ParentTask();
    }
    else {
      this.task.taskName = this.myForm.value.name;
      this.task.priority = this.myForm.value.priority;
      this.task.startDate = this.myForm.value.startDate;
      this.task.endDate = this.myForm.value.endDate;
      this.task.status = 'not-completed';
      this.taskService.addTask(this.task).subscribe();
      this.task = new Task();

    }

    this.myForm.reset();
    this.isParent = false;
  }

  onClick() {
    this.isParent = !this.isParent;
  }

}
