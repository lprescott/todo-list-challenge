import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.scss']
})
export class TodoNewComponent implements OnInit {

  // outputs addTodo, addList via an event emitter to todo-list
  @Output() addTodo: EventEmitter<any> = new EventEmitter<any>();
  @Output() addList: EventEmitter<any> = new EventEmitter<any>();

  // required for 2-way data binding through ngModel
  todoTitle: string;
  listTitle: string;

  constructor() { }

  ngOnInit() {
  }

  // creation of a Todo model using 2-way data binding and emitting
  onSubmit() {

    const list = {
      title: this.listTitle
    };

    this.addList.emit(list);


    // create a Todo model
    const todo = {
      title: this.todoTitle,
      completed: false
    };

    // emit upwards to todo-list component
    this.addTodo.emit(todo);

    // clear text
    this.todoTitle = undefined;
    this.listTitle = undefined;
  }
}
