import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodolistService } from '../../../services/todolist/todolist.service';
import { TodoList } from '../../../models/TodoList';
import { TodoService } from '../../../services/todo/todo.service';
import { Todo } from '../../../models/Todo';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.scss']
})
export class TodoNewComponent implements OnInit {
  // outputs addTodo  via an event emitter to todo-list
  @Output() addTodo: EventEmitter<any> = new EventEmitter<any>();

  // required for 2-way data binding through ngModel
  title: string;
  name: string;

  list = {} as TodoList;
  todos: Todo[] = [];

  constructor(
    private aroute: ActivatedRoute,
    private todoService: TodoService,
    private todolistService: TodolistService,
    private route: Router
  ) {}

  ngOnInit() {
    const id = Number(this.aroute.snapshot.params.lid);
    this.list.id = id;

    this.todolistService.getTodoList(id).subscribe(list => {
      this.list = list;
    });

    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos.filter(td => td.todoList.id === this.list.id);
    });
  }

  // creation of a Todo model using 2-way data binding and emitting
  onSubmit() {
    // create a Todo model
    const todo = {
      title: this.title,
      completed: false,
      todoList: this.list
    };

    // emit upwards to todo-list component
    this.addTodo.emit(todo);

    // clear text
    this.title = undefined;
  }

  goHome() {
    this.route.navigate(['/user/' + this.list.user.id]);
  }
}
