import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../models/Todo';
import { TodoService } from '../../../services/todo/todo.service';
import { TodoList } from '../../../models/TodoList';
import { ActivatedRoute, Router } from '@angular/router';
import { TodolistService } from '../../../services/todolist/todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  list = {} as TodoList;
  todos: Todo[] = [];
  id: number;

  // taking todoService in the constructor allows it to be accessed from inside the class
  constructor(
    private aroute: ActivatedRoute,
    private todoService: TodoService,
    private todolistService: TodolistService,
    private route: Router
  ) {}

  // receives existing todos from server on initialization, using todoService
  ngOnInit() {

    this.id = Number(this.aroute.snapshot.params.lid);
    this.list.id = this.id;

    this.todolistService.getTodoList(this.id).subscribe(list => {
      this.list = list;
    });

    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos.filter(td => td.todoList.id === this.list.id);
    });
  }

  // removes todo passed as argument from ui and server, using todoService
  deleteTodo(todo: Todo) {
    // remove from Server
    this.todoService.deleteTodo(todo).subscribe(del => {
      // remove from UI after deleted from server
      this.todos = this.todos.filter(t => t.id !== todo.id);
      console.log('Deleted \'' + todo.title + '\'');
    });
  }

  // adds todo passed as argument via post, suing todoService
  addTodo(todo: Todo) {
    // adds to server
    this.todoService.addTodo(todo).subscribe(td => {
      // adds to ui after added to server
      this.todos.push(td);
      // log
      console.log('Added \'' + todo.title + '\'');
      console.log(td);
    });
  }
}
