import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoList} from '../../../models/TodoList';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { faList } from '@fortawesome/free-solid-svg-icons';
import {TodoListService} from '../../../services/todo-list.service';
import swal from 'sweetalert2';
import {TodoService} from '../../../services/todo.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() list: TodoList;
  @Output() deleteList: EventEmitter<TodoList> = new EventEmitter<TodoList>();
  @Output() updateList: EventEmitter<TodoList> = new EventEmitter<TodoList>();

  editListForm: FormGroup;
  faList = faList;

  constructor(
    private todoListService: TodoListService,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private router: Router
  ) {
    this.editListForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
      ]
    });
  }

  ngOnInit() {
  }

  onSave(list: TodoList, newTitle: string) {
    // no change, return
    if (this.list.title === newTitle || newTitle.length === 0) {
      console.log('List not updated');
      return;
    }

    // change in UI
    this.list.title = newTitle;

    // change on Server and log
    this.todoListService.updateTodoList(list).subscribe(up => {
      console.log('Updated list.');
    });
  }

  onDelete(list: TodoList) {
    // get id of list
    const id = list.id;

    let count = 0;
    this.todoService.getTodos().subscribe(todos => {
      // get count of items in list
      todos = todos.filter(td => td.todolist.id === id);
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
              swal
                .fire('Deleted!', 'Your list has been deleted.', 'success')
                .then(() => console.log('Deleted list.'));
            }
          });
      } else {
        this.deleteList.emit(list);
        swal
          .fire('Deleted!', 'Your list has been deleted.', 'success')
          .then(() => console.log('Deleted list.'));
      }
    });
  }

  onRoute(list: TodoList) {
    this.router
      .navigateByUrl('/user/list/' + list.id)
      .then(() =>
        console.log(
          'Successfully redirected.'
        )
      );
  }
}
