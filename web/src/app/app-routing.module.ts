import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListListComponent } from './components/list/list-list/list-list.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:id', component: ListListComponent },
  { path: 'list/:id', component: TodoListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
