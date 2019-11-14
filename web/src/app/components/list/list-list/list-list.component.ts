import { Component, OnInit } from '@angular/core';
import { TodoList } from '../../../models/TodoList';
import { TodolistService } from '../../../services/list/todolist.service';
import { TodoService } from '../../../services/todo/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.scss']
})
export class ListListComponent implements OnInit {
  lists: TodoList[] = [];
  user: User;

  constructor(
    private todoListService: TodolistService,
    private todoService: TodoService,
    private aroute: ActivatedRoute,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit() {
    const id = Number(this.aroute.snapshot.params.id);

    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') !== String(id)) {
      this.route.navigate(['']);
    }

    this.todoListService.getTodoLists().subscribe(lists => {
      this.lists = lists.filter(list => list.user.id === id);
    });

    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  deleteList(list: TodoList) {
    this.todoListService.deleteTodoList(list).subscribe(del => {
      this.lists = this.lists.filter(t => t.id !== list.id);
      console.log('Deleted \'' + list.name + '\'');
    });
  }

  addList(list: TodoList) {
    this.todoListService.addTodoList(list).subscribe(ls => {
      this.lists.push(ls);
      console.log('Added \'' + list.name + '\'');
      console.log(ls);
    });
  }
}
