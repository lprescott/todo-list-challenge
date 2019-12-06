import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoNewComponent } from '../todo-new/todo-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoListComponent,
                TodoItemComponent,
                TodoNewComponent
            ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                RouterTestingModule
            ]
        }).compileComponents();
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
