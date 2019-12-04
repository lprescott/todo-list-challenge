import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {CookieService} from 'ngx-cookie-service';
import {TodoList} from '../../models/TodoList';
import {TodoListService} from '../../services/todo-list.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  lists: TodoList[] = [];

  constructor(private userService: UserService, private cookie: CookieService, private todoListService: TodoListService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(response => {
      this.user = response.user;
      this.cookie.set('jwt', response.jwt);

      this.todoListService.getTodoLists().subscribe(lists => {
        this.lists = lists.filter(ls => ls.user.id === this.user.id);
      });
    });
  }

  deleteList(list: TodoList) {
    this.todoListService.deleteTodoList(list).subscribe(() => {
      this.lists = this.lists.filter(ls => ls.id !== list.id);
    });
  }

  addList(list: TodoList) {
    this.todoListService.addTodoList(list).subscribe(ls => {
      this.lists.push(ls);
    });
  }

  trackByLists(index: number, list: TodoList): number {
    return list.id;
  }
}
