import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodolistService} from "../../services/todolist.service";

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.scss']
})
export class TodoNewComponent implements OnInit {

  // outputs addTodo  via an event emitter to todo-list
  @Output() addTodo: EventEmitter<any> = new EventEmitter<any>();

  // required for 2-way data binding through ngModel
  title: string;

  name: string;
  id: number;

  constructor(private route: ActivatedRoute, private todoListService: TodolistService) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.params.id);
    this.id = id;

    this.todoListService.getTodoLists().subscribe(lists => {
      this.name = lists.filter(ls => ls.id === id)[0].name;
    });
  }

  // creation of a Todo model using 2-way data binding and emitting
  onSubmit() {

    // create a Todo model
    const todo = {
      title: this.title,
      completed: false
    };

    // emit upwards to todo-list component
    this.addTodo.emit(todo);

    // clear text
    this.title = undefined;
  }
}
