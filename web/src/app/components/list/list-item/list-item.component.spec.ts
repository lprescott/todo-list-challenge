import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {ListItemComponent} from './list-item.component';
import {TodoService} from '../../../services/todo.service';
import {TodoListService} from '../../../services/todo-list.service';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [TodoService, TodoListService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
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
    component.editListForm.controls.name.setValue(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    );
    expect(component.editListForm.valid).toBeFalsy();
  });

  it('should call onSave when valid', async(() => {
    spyOn(component, 'onSave');
    component.editListForm.controls.name.setValue('Todo Item Test');
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('#save').click();

    fixture.whenStable().then(() => {
      expect(component.onSave).toHaveBeenCalled();
    });
  }));
});
