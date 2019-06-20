import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'taskPipe'
})
export class TaskPipe implements PipeTransform {
  
  filteredData: Task[];

  transform(tasks: Task[], taskSearch: String,parentTaskSearch: String, startDateSearch:Date, endDateSearch: Date): Task[] {
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
          if(startDateSearch && task.startDate==startDateSearch) {
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
