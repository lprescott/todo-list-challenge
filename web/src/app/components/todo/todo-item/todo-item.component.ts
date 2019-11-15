import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../../models/Todo';
import { TodoService } from '../../../services/todo/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  // the current model inputted from the above component todo-list
  @Input() todo: Todo;

  // outputs deleteTodo via an event emitter to todo-list
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // outputs updateTodo via an event emitter to todo-list
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // taking todoService in the constructor allows it to be accessed from inside the class
  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  // set the class of a todo dynamically to todo, and is-complete
  setClasses() {
    const classes = {
      todo: true,
      'is-complete': this.todo ? this.todo.completed : false
    };

    return classes;
  }

  // updates the current todos title text
  onSave(todo: Todo, newTitle: string) {
    // check if no change or no length
    if (this.todo.title === newTitle || newTitle.length === 0) {
      console.log("'" + this.todo.title + "' not updated");
      return;
    }

    // update on client side memory
    this.todo.title = newTitle;

    // update on server
    this.todoService.updateTodo(todo).subscribe(up => {
      console.log('Updated todo ' + todo.id + " to '" + this.todo.title + "'");
      console.log(up);
    });
  }

  // emits the function deleteTodo to todo-list component and logs
  onDelete(todo: Todo) {
    // deletes and emit
    this.deleteTodo.emit(todo);
  }

  // toggles the completed boolean value in ui, server, then logs
  onToggle(todo: Todo) {
    // toggles UI
    todo.completed = !todo.completed;

    // toggles Server
    this.todoService.toggleCompleted(todo).subscribe(td => {
      console.log(
        "Toggled '" + todo.title + "' completion to " + todo.completed
      );
      console.log(td);
    });
  }
}
