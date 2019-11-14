import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo/todo-item/todo-item.component';
import { TodoNewComponent } from './components/todo/todo-new/todo-new.component';
import { TodoService } from './services/todo.service';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { ListNewComponent } from './components/list/list-new/list-new.component';
import { ListListComponent } from './components/list/list-list/list-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoNewComponent,
    ListItemComponent,
    ListNewComponent,
    ListListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
