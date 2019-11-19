import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistItemComponent } from './todolist-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { TodolistService } from '../../../services/todolist/todolist.service';
import { TodoService } from '../../../services/todo/todo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('ListItemComponent', () => {
  let component: TodolistItemComponent;
  let fixture: ComponentFixture<TodolistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodolistItemComponent],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [TodoService, TodolistService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create todolist item component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.editListForm.valid).toBeFalsy();
  });

  it('form invalid when w/ large input', () => {
    component.editListForm.controls.name.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ');
    expect(component.editListForm.valid).toBeFalsy();
  });

  it('should call onSave when valid', async(() => {
    spyOn(component, 'onSave');
    component.editListForm.controls.name.setValue('Todo Item Test');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#save');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onSave).toHaveBeenCalled();
    });
  }));
});
