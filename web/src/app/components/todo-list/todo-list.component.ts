import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
import {TodoList} from "../../models/TodoList";
import {TodolistService} from "../../services/todolist.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  // array of todos
  // todos: Todo[];
  todos: Todo[] = [];
  title: string;

  // taking todoService in the constructor allows it to be accessed from inside the class
  constructor(private todoService: TodoService, private listService: TodolistService) { }

  // receives existing todos from server on initialization, using todoService
  ngOnInit() {
    this.todoService.getTodos().subscribe( todos => {
      this.todos = todos;
    });
  }

  // removes todo passed as argument from ui and server, using todoService
  deleteTodo(todo: Todo) {
    // remove from Server
    this.todoService.deleteTodo(todo).subscribe( del => {
      // remove from UI after deleted from server
      this.todos = this.todos.filter(t => t.id !== todo.id);
      console.log('Deleted \'' + todo.title + '\'');
      }
    );
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
