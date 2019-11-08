import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNewComponent } from './todo-new.component';
import {FormsModule} from '@angular/forms';

describe('TodoNewComponent', () => {
  let component: TodoNewComponent;
  let fixture: ComponentFixture<TodoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TodoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
