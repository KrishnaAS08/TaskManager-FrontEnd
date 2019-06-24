import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AddComponent } from './tasks/actions/add/add.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { MaterialModule } from './material/material.module';
import { ParentSearchComponent } from './tasks/dialog/parent-search/parent-search.component';
import { EndComponent } from './tasks/dialog/end/end.component';
import { EditComponent } from './tasks/dialog/edit/edit.component';
import { TaskPipe } from './tasks/pipe/task-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AddComponent,
    EditComponent,
    EndComponent,
    TaskListComponent,
    ParentSearchComponent,
    TaskPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,   
    AppRoutingModule
  ],
  entryComponents: [
    ParentSearchComponent,
    EndComponent
  ],
  providers: [EditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
