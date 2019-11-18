import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistNewComponent } from './todolist-new.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListNewComponent', () => {
  let component: TodolistNewComponent;
  let fixture: ComponentFixture<TodolistNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodolistNewComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
