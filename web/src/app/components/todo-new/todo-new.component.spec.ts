import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNewComponent } from './todo-new.component';
import {FormsModule} from '@angular/forms';
import {AppComponent} from "../../app.component";

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

  it('should render title', () => {
    fixture = TestBed.createComponent(TodoNewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#header1').textContent).toContain('Todo List Challenge');
  });
});
