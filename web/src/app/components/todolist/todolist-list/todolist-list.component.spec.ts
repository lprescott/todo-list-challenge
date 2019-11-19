import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistListComponent } from './todolist-list.component';
import { TodolistNewComponent } from '../todolist-new/todolist-new.component';
import { TodolistItemComponent } from '../todolist-item/todolist-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListListComponent', () => {
  let component: TodolistListComponent;
  let fixture: ComponentFixture<TodolistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodolistListComponent, TodolistNewComponent, TodolistItemComponent],
      imports: [
        HttpClientTestingModule,
        FontAwesomeModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
