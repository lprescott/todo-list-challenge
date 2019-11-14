import { Component, OnInit } from '@angular/core';
import { TodoList } from '../../../models/TodoList';
import { TodolistService } from '../../../services/list/todolist.service';
import { TodoService } from '../../../services/todo/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.scss']
})
export class ListListComponent implements OnInit {
  lists: TodoList[] = [];

  constructor(
    private todoListService: TodolistService,
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params.id);
    this.todoListService.getTodoLists().subscribe(lists => {
      this.lists = lists.filter(list => list.user.id === id);
    });
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
