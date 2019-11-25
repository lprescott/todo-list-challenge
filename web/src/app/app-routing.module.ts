import { AuthGuard } from './services/security/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodolistListComponent } from './components/todolist/todolist-list/todolist-list.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user/:uid', component: TodolistListComponent, canActivate: [AuthGuard] },
  { path: 'user/:uid/list/:lid', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
