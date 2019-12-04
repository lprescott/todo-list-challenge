import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import {CookieService} from 'ngx-cookie-service';
import {TodoList} from '../../../models/TodoList';
import {Todo} from '../../../models/Todo';
import {TodoService} from '../../../services/todo.service';
import {TodoListService} from '../../../services/todo-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  list = {} as TodoList; // list: TodoList;
  todos: Todo[] = []; // todos: Todo[];
  username: string;

  constructor(
    private aroute: ActivatedRoute,
    private cookie: CookieService,
    private todoService: TodoService,
    private todolistService: TodoListService,
    private router: Router
  ) {}

  ngOnInit() {
    // standalone usage of jwt decoder
    const jwtHelper = new JwtHelperService();

    // get user id and name
    const jwt = jwtHelper.decodeToken(this.cookie.get('jwt'));
    const uid = jwt.id;
    this.username = jwt.sub;

    // get todolist
    this.todolistService.getTodoList(Number(this.aroute.snapshot.params.lid)).subscribe(list => {
      this.list = list;

      // check todolist user and user
      if (uid !== list.user.id) {
        this.router.navigate(['/user']);
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
