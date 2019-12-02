import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ListNewComponent} from './list-new.component';

describe('ListNewComponent', () => {
  let component: ListNewComponent;
  let fixture: ComponentFixture<ListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListNewComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewComponent);
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
    component.newListForm.controls.name.setValue(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    );
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
