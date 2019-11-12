import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {TodoNewComponent} from '../todo-new/todo-new.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoItemComponent, TodoNewComponent],
      imports: [FormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create todo list component', () => {
    expect(component).toBeTruthy();
  });
});
