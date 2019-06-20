import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AddComponent } from './tasks/actions/add/add.component';
import { EditComponent } from './tasks/dialog/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'tasks/edit/:id',
    component: EditComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
