import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [TodoItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create todo item component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.editTodoForm.valid).toBeFalsy();
  });

  it('form invalid when w/ large input', () => {
    component.editTodoForm.controls.title.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.\n');
    expect(component.editTodoForm.valid).toBeFalsy();
  });
});
