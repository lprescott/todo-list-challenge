import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoList } from '../../models/TodoList';
import { TodolistService } from '../../services/todolist.service';
import { Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  constructor(
    private router: Router,
    private todoListService: TodolistService,
    private todoService: TodoService
  ) {}

  @Input() list: TodoList;
  @Output() deleteList: EventEmitter<TodoList> = new EventEmitter<TodoList>();
  @Output() updateList: EventEmitter<TodoList> = new EventEmitter<TodoList>();

  faList = faList;

  ngOnInit() {}

  onSave(list: TodoList, newName: string) {
    if (this.list.name === newName || newName.length === 0) {
      console.log('\'' + this.list.name + '\' not updated');
      return;
    }

    this.list.name = newName;

    this.todoListService.updateTodoList(list).subscribe(up => {
      console.log('Updated list ' + list.id + ' to \'' + this.list.name + '\'');
      console.log(up);
    });
  }

  // emits the function deleteTodo to todo-list component and logs
  onDelete(list: TodoList) {
    // get id of list
    const id = list.id;

    let count = 0;
    this.todoService.getTodos().subscribe(todos => {
      // get count of items in list
      todos = todos.filter(td => td.todoList.id === id);
      count = todos.length;

      // confirmation only on list with tasks
      if (count > 0) {
        swal
          .fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4cabff',
            cancelButtonColor: '#FF605C',
            confirmButtonText: 'Yes, delete it!'
          })
          .then(result => {
            if (result.value) {
              this.deleteList.emit(list);
              swal.fire('Deleted!', 'Your list has been deleted.', 'success');
            }
          });
      } else {
        this.deleteList.emit(list);
        swal.fire('Deleted!', 'Your list has been deleted.', 'success');
      }
    });
  }

  onRoute(list: TodoList) {
    this.router
      .navigateByUrl('/list/' + list.id)
      .then(r => console.log('Successfully redirected to /list/' + list.id));
  }
}
