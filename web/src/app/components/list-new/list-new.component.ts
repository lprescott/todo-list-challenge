import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.scss']
})
export class ListNewComponent implements OnInit {

  // outputs addTodo, addTodoList via an event emitter to todo-list
  @Output() addList: EventEmitter<any> = new EventEmitter<any>();

  name: string;

  constructor() { }

  ngOnInit() {
  }

  // creation of a Todo model using 2-way data binding and emitting
  onSubmit() {

    // create a Todo model
    const list = {
      name: this.name
    };

    // emit upwards to todo-list component
    this.addList.emit(list);

    // clear text
    this.name = undefined;
  }
}
