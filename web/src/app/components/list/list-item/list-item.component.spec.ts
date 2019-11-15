import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { TodolistService } from '../../../services/list/todolist.service';
import { TodoService } from '../../../services/todo/todo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [TodoService, TodolistService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
