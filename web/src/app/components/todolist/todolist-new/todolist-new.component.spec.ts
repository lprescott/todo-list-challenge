import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistNewComponent } from './todolist-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoList } from '../../../models/TodoList';

describe('ListNewComponent', () => {
  let component: TodolistNewComponent;
  let fixture: ComponentFixture<TodolistNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodolistNewComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new todolist component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.newListForm.valid).toBeFalsy();
  });

  it('form invalid when w/ large input', () => {
    component.newListForm.controls.name.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ');
    expect(component.newListForm.valid).toBeFalsy();
  });

  it('should call onSubmit when valid', async(() => {
    spyOn(component, 'onSubmit');
    component.newListForm.controls.name.setValue('Todo List Test');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  }));
});
