import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoList} from '../../../models/TodoList';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.scss']
})
export class TodoNewComponent implements OnInit {

  @Input() list: TodoList;
  @Output() addTodo: EventEmitter<any> = new EventEmitter<any>();

  newTodoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.newTodoForm = formBuilder.group({
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    // create a Todo model
    const todo = {
      text: this.newTodoForm.controls.text.value,
      completed: false,
      todolist: this.list
    };

    // emit upwards to todo-list component
    this.addTodo.emit(todo);

    // reset
    this.newTodoForm.reset();
  }

}
