import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'taskPipe'
})
export class TaskPipe implements PipeTransform {

  transform(tasks: Task[], taskSearch: String,parentTaskSearch: String, priorityFrom: number,
     priorityTo: number, startDateSearch:Date, endDateSearch: Date): Task[] {
    if(tasks && tasks.length) {
      return tasks.filter(
        task=> {
          if(taskSearch && task.taskName.toLowerCase().indexOf(taskSearch.toLowerCase()) === -1){
            return false;
          }
          if(parentTaskSearch && task.parentName==null){
            return false;
          }            
          if(parentTaskSearch && task.parentName.toLowerCase().indexOf(parentTaskSearch.toLowerCase()) === -1){
            return false;
          }
          if(startDateSearch && !(startDateSearch.toDateString() === (new Date(task.startDate)).toDateString())){
            return false;
          }
          if(endDateSearch && !(endDateSearch.toDateString() === (new Date(task.endDate)).toDateString())){
            return false;
          }
          if(priorityFrom && priorityTo && !(task.priority>=priorityFrom) && (task.priority<=priorityTo)){
            return false;
          }
          else if(priorityFrom && !(task.priority>=priorityFrom)){
            return false;
          }
          else if(priorityTo && !(task.priority<=priorityTo)){
            return false;
          }
          return true;
        })
    }
    else{
      return tasks;
    }

  }

}
