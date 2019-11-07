import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.scss']
})
export class TodoNewComponent implements OnInit {

  // outputs addTodo via an event emitter to todo-list
  @Output() addTodo: EventEmitter<any> = new EventEmitter<any>();

  // required for 2-way data binding through ngModel
  title: string;

  // simulating a database's incrementing primary key
  id = 1;

  constructor() { }

  ngOnInit() {
  }

  // creation of a Todo model using 2-way data binding and emitting
  onSubmit() {

    // create a Todo model
    const todo = {
      id: this.id,
      title: this.title,
      completed: false
    };

    // increment id
    this.id += 1;

    // emit upwards to todo-list component
    this.addTodo.emit(todo);

    // log
    console.log('Added \'' + todo.title +'\'');

    // clear text
    this.title = undefined;
  }
}
