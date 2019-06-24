import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ParentSearchComponent } from '../parent-search/parent-search.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  task: Task = new Task();
  id: number;

  max = 30;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;

  constructor(public dialog: MatDialog, public taskService: TaskService, private route: ActivatedRoute) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
   });
    
    this.taskService.getTaskById(this.id)
      .subscribe(
        data => {
          this.task = data;
        }
      );

  }
  getParentList() :Observable<any>{
    const dialogRef = this.dialog.open(ParentSearchComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.task.parentId = result.parentId;
        this.task.parentName = result.parentTask;
      }
  });
    return dialogRef.afterClosed();
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field':'';
  }

  doneEdit(id: number): void {
    this.taskService.updateTask(id, this.task).subscribe();
  }

}
