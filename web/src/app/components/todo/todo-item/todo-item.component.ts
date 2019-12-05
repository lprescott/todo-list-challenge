import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../../../models/Todo';
import {TodoService} from '../../../services/todo/todo.service';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  editTodoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
    this.editTodoForm = this.formBuilder.group({
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

  setClasses() {
    return {
      todo: true,
      'is-complete': this.todo ? this.todo.completed : false
    };
  }

  onSave(todo: Todo, newText: string) {
    // check if no change or no length
    if (this.todo.text === newText || newText.length === 0) {
      console.log('Todo not updated.');
      return;
    }

    // update on client side memory
    this.todo.text = newText;

    // update on server
    this.todoService.updateTodo(todo).subscribe(up => {
      console.log('Updated todo.');
    });
  }

  onDelete(todo: Todo) {
    // deletes and emit
    this.deleteTodo.emit(todo);
  }

  onToggle(todo: Todo) {
    // toggles UI
    todo.completed = !todo.completed;

    // toggles Server
    this.todoService.toggleCompleted(todo).subscribe(td => {
      console.log(
        'Toggled todo.'
      );
    });
  }

  onReset(todo: Todo) {
    this.editTodoForm.controls.text.setValue(todo.text);
    return false;
  }
}
