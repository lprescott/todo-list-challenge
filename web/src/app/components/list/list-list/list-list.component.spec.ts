import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListListComponent } from './list-list.component';
import { ListNewComponent } from '../list-new/list-new.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListListComponent', () => {
  let component: ListListComponent;
  let fixture: ComponentFixture<ListListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListListComponent, ListNewComponent, ListItemComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
