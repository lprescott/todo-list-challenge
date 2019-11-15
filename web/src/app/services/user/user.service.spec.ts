import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { TodolistService } from '../list/todolist.service';
import { User } from '../../models/User';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {

  // create a mock httpMock object and service used for testing
  let httpMock: HttpTestingController;
  let service: TodolistService;

  // create a list for testing
  const firstUser = new User();
  firstUser.id = 1;
  firstUser.name = 'Test User';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
