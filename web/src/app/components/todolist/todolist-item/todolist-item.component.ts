import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoList } from '../../../models/TodoList';
import { TodolistService } from '../../../services/todolist/todolist.service';
import { Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { TodoService } from '../../../services/todo/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss']
})
export class TodolistItemComponent implements OnInit {

  constructor(
    private router: Router,
    private todoListService: TodolistService,
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
    this.editListForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
  }

  // the current model inputted from the above component todolist-list
  @Input() list: TodoList;

  // outputs deleteList via an event emitter to todolist-list
  @Output() deleteList: EventEmitter<TodoList> = new EventEmitter<TodoList>();

  // outputs updateList via an event emitter to todolist-list
  @Output() updateList: EventEmitter<TodoList> = new EventEmitter<TodoList>();

  // the components formgroup
  private editListForm: FormGroup;

  // font-awesome icon's variable (list icon)
  faList = faList;

  ngOnInit() {}

  // On updating the list name
  onSave(list: TodoList, newName: string) {

    // no change, return
    if (this.list.name === newName || newName.length === 0) {
      console.log('\'' + this.list.name + '\' not updated');
      return;
    }

    // change in UI
    this.list.name = newName;

    // change on Server and log
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

  // routes the current user to the passes lists todos page, and logs
  onRoute(list: TodoList) {
    this.router
      .navigateByUrl('/user/' + list.user.id + '/list/' + list.id)
      .then(r => console.log('Successfully redirected to /user/' + list.user.id + '/list/' + list.id));
  }
}
