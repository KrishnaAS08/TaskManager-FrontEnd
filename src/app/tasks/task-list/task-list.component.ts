import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material';
import { TaskService } from '../services/task.service';
import { EndComponent } from '../dialog/end/end.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  
  isUpdate = true;
  index: number;
  id: number;

  tasks: Observable<Task[]>;
  searchTasks: Task[];
  taskSearch: String;
  parentTaskSearch: String;
  priorityFrom: number;
  priorityTo: number;
  startDateSearch:Date;
  endDateSearch: Date;
  edittask: Task;

  constructor(public dialog: MatDialog, public taskService: TaskService) {}

   ngOnInit() {
    this.isUpdate = true;
     this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTaskList()
      .subscribe(
        data => {
          this.tasks = data;
          this.searchTasks = data;
        }
      );
      
  }

  startEdit(i: number,selectTask: Task) {
    this.isUpdate = false;
    this.edittask = selectTask;
  }

  endTask(taskId: number, taskName: string, parentName: String, priority: number,
    startDate: Date, endDate: Date, parentId: number, status: String) {
    const dialogRef = this.dialog.open(EndComponent, {
      data: {taskId: taskId, taskName: taskName, parentName: parentName,priority: priority, startDate: startDate,
         endDate: endDate, parentId: parentId, status: status}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTaskList();
    });
  }

  

}
