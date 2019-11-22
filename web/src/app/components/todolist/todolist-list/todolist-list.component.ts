import { Component, OnInit } from '@angular/core';
import { TodoList } from '../../../models/TodoList';
import { TodolistService } from '../../../services/todolist/todolist.service';
import { TodoService } from '../../../services/todo/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user/user.service';
import { JwtService } from '../../../services/security/jwt.service';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-list-list',
  templateUrl: './todolist-list.component.html',
  styleUrls: ['./todolist-list.component.scss']
})
export class TodolistListComponent implements OnInit {
  lists: TodoList[] = [];
  user: User;
  private json: any;

  constructor(
    private todoListService: TodolistService,
    private todoService: TodoService,
    private aroute: ActivatedRoute,
    private userService: UserService,
    private route: Router,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    // get url parameter
    const id = Number(this.aroute.snapshot.params.uid);

    // check if logged in
    if (document.cookie.indexOf('jwt') === -1) {
      this.route.navigate(['']);
    } else {
      // authenticate
      this.jwtService
        .authenticate(LoginComponent.getCookie('jwt'))
        .subscribe(user => {

          // reroute if the parsing is unsuccessful or uid doesn't match id
          try {
            this.json = JSON.parse(user);
          } catch (e) {
            this.json = user;
          }

          if (this.json.uid !== id) {
            this.route.navigate(['']);
          }
        });
    }

    // get existing todolists
    this.todoListService.getTodoLists().subscribe(lists => {
      this.lists = lists.filter(list => list.user.id === id);
    });

    // get current user
    this.userService.getUser(id).subscribe(user => (this.user = user));
  }

  deleteList(list: TodoList) {
    this.todoListService.deleteTodoList(list).subscribe(() => {
      this.lists = this.lists.filter(t => t.id !== list.id);
    });
  }

  addList(list: TodoList) {
    this.todoListService.addTodoList(list).subscribe(ls => {
      this.lists.push(ls);
      console.log('Added list.');
    });
  }

  // This function uses by *ngFor with trackBy to only reload content
  // from the server if their ids change
  trackByLists(index: number, list: TodoList): number {
    return list.id;
  }
}
