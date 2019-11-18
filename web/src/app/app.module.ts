import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo/todo-item/todo-item.component';
import { TodoNewComponent } from './components/todo/todo-new/todo-new.component';
import { TodoService } from './services/todo/todo.service';
import { TodolistItemComponent } from './components/todolist/todolist-item/todolist-item.component';
import { TodolistNewComponent } from './components/todolist/todolist-new/todolist-new.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { TodolistService } from './services/todolist/todolist.service';
import { UserService } from './services/user/user.service';
import { TodolistListComponent } from './components/todolist/todolist-list/todolist-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoNewComponent,
    TodolistItemComponent,
    TodolistNewComponent,
    TodolistListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [TodoService, TodolistService, UserService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule {}
