import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNewComponent } from './todo-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoNewComponent', () => {
    let component: TodoNewComponent;
    let fixture: ComponentFixture<TodoNewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule
            ],
            declarations: [TodoNewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create new todo component', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.newTodoForm.valid).toBeFalsy();
    });

    it('form invalid when w/ large input', () => {
        component.newTodoForm.controls.title.setValue(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                'Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.\n'
        );
        expect(component.newTodoForm.valid).toBeFalsy();
    });

    it('should call onSubmit when valid', async(() => {
        spyOn(component, 'onSubmit');
        component.newTodoForm.controls.title.setValue('Todo Item Test');
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector(
            'button'
        );
        button.click();

        fixture.whenStable().then(() => {
            expect(component.onSubmit).toHaveBeenCalled();
        });
    }));
});
