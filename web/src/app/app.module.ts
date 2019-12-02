import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ListNewComponent } from './components/list/list-new/list-new.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { TodoNewComponent } from './components/todo/todo-new/todo-new.component';
import { TodoItemComponent } from './components/todo/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    ListNewComponent,
    ListItemComponent,
    TodoNewComponent,
    TodoItemComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [ UserService, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
