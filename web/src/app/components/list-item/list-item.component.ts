import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoList} from '../../models/TodoList';
import {TodolistService} from '../../services/todolist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() list: TodoList;
  @Output() deleteList: EventEmitter<TodoList> = new EventEmitter<TodoList>();
  @Output() updateList: EventEmitter<TodoList> = new EventEmitter<TodoList>();

  constructor(private router: Router, private todoListService: TodolistService) { }

  ngOnInit() {
  }

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

    // deletes and emit
    this.deleteList.emit(list);
  }

  onRoute(list: TodoList) {
    this.router.navigateByUrl('/list/' + list.id).then(r => console.log('Successfully redirected to /list/' + list.id));
  }
}
