import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListListComponent } from './components/list-list/list-list.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', component: ListListComponent },
  { path: 'list/:id', component: TodoListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
