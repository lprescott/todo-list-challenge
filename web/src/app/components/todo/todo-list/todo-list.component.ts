import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import {CookieService} from 'ngx-cookie-service';
import {TodoList} from '../../../models/TodoList';
import {Todo} from '../../../models/Todo';
import {TodoService} from '../../../services/todo.service';
import {TodoListService} from '../../../services/todo-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  user: User;
  list = {} as TodoList; // list: TodoList;
  todos: Todo[] = []; // todos: Todo[];

  constructor(
    private aroute: ActivatedRoute,
    private cookie: CookieService,
    private todoService: TodoService,
    private todolistService: TodoListService,
    private router: Router
  ) {}

  ngOnInit() {
    // get user
    this.user = JSON.parse(this.cookie.get('user'));

    // get todolist
    this.todolistService.getTodoList(Number(this.aroute.snapshot.params.lid)).subscribe(list => {
      this.list = list;

      // check todolist user and user
      if (this.user.id !== list.user.id) {
        this.router.navigate(['/#/user']);
      }

      // get todos
      this.todoService.getTodos().subscribe(todos => {
        this.todos = todos.filter(todo => todo.todolist.id === this.list.id);
      });
    });
  }

  deleteTodo(todo: Todo) {
    // remove from Server
    this.todoService.deleteTodo(todo).subscribe(() => {
      // remove from UI after deleted from server
      this.todos = this.todos.filter(t => t.id !== todo.id);
      console.log('Deleted todo.');
    });
  }

  addTodo(todo: Todo) {
    // adds to server
    this.todoService.addTodo(todo).subscribe(td => {
      // adds to ui after added to server
      this.todos.push(td);
      // log
      console.log('Added todo.');
    });
  }

  trackByTodos(index: number, todo: Todo): number {
    return todo.id;
  }
}
