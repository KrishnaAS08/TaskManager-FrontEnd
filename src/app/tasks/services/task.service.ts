import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ParentTask } from '../models/parent-task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8091/taskmanager';

  dataChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  parentDataChange: BehaviorSubject<ParentTask[]> = new BehaviorSubject<ParentTask[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) { }

  get data() : Task[] {
    return this.dataChange.value;
  }

  get parentData() : ParentTask[] {
    return this.parentDataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllTasks() {
    this.http.get<Task[]>(`${this.baseUrl}` + '/tasks' + '/getTasks')
      .subscribe(
        data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        }
      );
  }

  getAllParentTasks() {
    this.http.get<ParentTask[]>(`${this.baseUrl}` + '/parentTasks' + '/getTasks')
      .subscribe(
        data => {
          this.parentDataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        }
      );
  }

  getTaskList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/tasks' + '/getTasks');
  }

  getParentTaskList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/parentTasks' + '/getTasks');
    
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/tasks' + `/getTask` + `/${id}`);
  } 

  addTask(task: Task): Observable<any> {
    this.dialogData = task;
    return this.http.post(`${this.baseUrl}` + '/tasks' + `/addTask`, task);
  }

  addParentTask(parentTask: ParentTask): Observable<any> {
    this.dialogData = parentTask;
    return this.http.post(`${this.baseUrl}` + '/parentTasks' + `/addTask`, parentTask);
  }

  updateTask(id: number, task: Task): Observable<any> {
    this.dialogData = task;
    return this.http.put(`${this.baseUrl}` + '/tasks' + `/updateTask` + `/${id}`, task);
  }


  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + '/tasks' + `/deleteTask` + `/${id}`, { responseType: 'text' });
  }
}
