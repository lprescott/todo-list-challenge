import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
import {TodoList} from '../../models/TodoList';
import {ActivatedRoute} from '@angular/router';
import {TodolistService} from '../../services/todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  list = {} as TodoList;
  todos: Todo[] = [];

  // taking todoService in the constructor allows it to be accessed from inside the class
  constructor(private route: ActivatedRoute, private todoService: TodoService, private todolistService: TodolistService) { }

  // receives existing todos from server on initialization, using todoService
  ngOnInit() {
    const id = Number(this.route.snapshot.params.id);
    this.list.id = id;

    this.todolistService.getTodoLists().subscribe(lists => {
      this.list.name = lists.filter(list => list.id === this.list.id)[0].name;
    });

    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos.filter(td => td.todoList.id === this.list.id);
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
