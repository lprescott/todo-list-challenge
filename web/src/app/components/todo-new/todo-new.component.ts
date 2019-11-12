import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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
  name = 'Todo List';

  constructor() { }

  ngOnInit() {
  }

  // creation of a Todo model using 2-way data binding and emitting
  onSubmit() {

    // create a Todo model
    const todo = {
      title: this.title,
      completed: false
    };

    // emit upwards to todo-list component
    this.addTodo.emit(todo);

    // clear text
    this.title = undefined;
  }
}
