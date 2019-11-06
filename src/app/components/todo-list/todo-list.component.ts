import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  // array of todos
  // todos: Todo[];
  todos: Todo[] = [];


  // taking todoService in the constructor allows it to be accessed from inside the class
  constructor(private todoService: TodoService) { }

  // receives existing todos from server on initialization, using todoService
  ngOnInit() {
    /* get todos from server
    this.todoService.getTodos().subscribe( todos => {
      this.todos = todos;
    });
    */
  }

  // removes todo passed as argument from ui and server, using todoService
  deleteTodo(todo: Todo) {
    // remove from UI
    // this.todos = this.todos.filter(t => t.id !== todo.id);
    this.todos = this.todos.filter(t => t.title !== todo.title);

    // remove from Server
    // this.todoService.deleteTodo(todo).subscribe();
  }

  // adds todo passed as argument via post, suing todoService
  addTodo(todo: Todo) {
    // add to UI only
    this.todos.push(todo);

    /* add to server and UI
    this.todoService.addTodo(todo).subscribe(td => {
      this.todos.push(td);
    });
    */
  }
}
