import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EndComponent>,
    @Inject (MAT_DIALOG_DATA) public task: Task,
    public taskService: TaskService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEndTask(): void {
    this.task.status = 'completed';
    this.taskService.updateTask(this.task.taskId,this.task).subscribe();
  }

}
