import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodolistService } from '../../../services/todolist/todolist.service';
import { TodoList } from '../../../models/TodoList';
import { TodoService } from '../../../services/todo/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.scss']
})
export class TodoNewComponent implements OnInit {

  constructor(
    private aroute: ActivatedRoute,
    private todoService: TodoService,
    private todolistService: TodolistService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.newTodoForm = formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    });
  }

  // outputs addTodo  via an event emitter to todo-list
  @Output() addTodo: EventEmitter<any> = new EventEmitter<any>();

  // the list inputted from todo-list component
  @Input() list: TodoList;

  // the components formgroup
  newTodoForm: FormGroup;

  ngOnInit() {
  }

  // creation of a Todo model using 2-way data binding and emitting
  onSubmit() {
    // create a Todo model
    const todo = {
      title: this.newTodoForm.controls.title.value,
      completed: false,
      todoList: this.list
    };

    // emit upwards to todo-list component
    this.addTodo.emit(todo);

    // reset
    this.newTodoForm.reset();
  }

  // returns to the users home page
  goHome() {
    this.route.navigate(['/user/' + this.list.user.id]);
  }
}
