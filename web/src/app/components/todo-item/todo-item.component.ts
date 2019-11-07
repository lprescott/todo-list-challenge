import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss' ]
})
export class TodoItemComponent implements OnInit {
  // the current model is inputted from the above component todo-list
  @Input() todo: Todo;

  // outputs deleteTodo via an event emitter to todo-list
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // outputs updateTodo via an event emitter to todo-list
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // taking todoService in the constructor allows it to be accessed from inside the class
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // set the class of a todo dynamically to todo, and is-complete
  setClasses() {
    const classes = {
      todo: true,
      'is-complete': this.todo.completed
    };

    return classes;
  }

  // updates the current todos title text
  onSave(todo: Todo, newId: string, newTitle: string) {

    // check if no change
    if (this.todo.title === newTitle) {
      console.log('\'' + this.todo.title + '\' not updated');
      return;
    }

    // create todo object with new title
    const newTodo = {
      id: Number(newId),
      title: newTitle,
    };

    // update on ui
    this.todo.title = newTodo.title;

    // update on server
    // this.todoService.updateTodo(todo).subscribe();

    console.log('Updated todo ' + todo.id + ' to \'' + this.todo.title + '\'');
  }

  // emits the function deleteTodo to todo-list component and logs
  onDelete(todo: Todo) {

    // deletes and emit
    this.deleteTodo.emit(todo);

    console.log('Deleted \'' + todo.title + '\'');
  }

  // toggles the completed boolean value in ui, server, then logs
  onToggle(todo: Todo) {

    // toggles UI
    todo.completed = !todo.completed;

    // toggles Server
    // this.todoService.toggleCompleted(todo).subscribe(td => console.log(td));

    console.log('Toggled \'' + todo.title + '\' completion to ' + todo.completed);
  }
}
