import { TestBed } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ListService } from './list.service';
import { TodoList } from '../../models/TodoList';

describe('TodolistService', () => {
    // create a mock httpMock object and service used for testing
    let httpMock: HttpTestingController;
    let service: ListService;

    // create a list for testing
    const firstList = new TodoList();
    firstList.id = 1;
    firstList.title = 'Test Todo List';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, HttpClientModule, HttpClientTestingModule],
            providers: [ListService]
        });

        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(ListService);
    });

    it('should be created', () => {
        service = TestBed.get(ListService);
        expect(service).toBeTruthy();
    });

    it('should addList() and POST', () => {
        service
            .addTodoList(firstList)
            .subscribe(todo => expect(todo).toEqual(firstList));

        const request = httpMock.expectOne('/lists');

        expect(request.request.method).toEqual('POST');
        request.flush(firstList);
        httpMock.verify();
    });

    it('should updateList() and PUT', () => {
        service
            .updateTodoList(firstList)
            .subscribe(todo => expect(todo).toEqual(firstList));

        const request = httpMock.expectOne('/lists/1');

        expect(request.request.method).toEqual('PUT');
        request.flush(firstList);
        httpMock.verify();
    });

    it('should deleteList() and DELETE', () => {
        service
            .deleteTodoList(firstList)
            .subscribe(() => expect(null).toEqual(null));

        const request = httpMock.expectOne('/lists/1');

        expect(request.request.method).toEqual('DELETE');
        request.flush({});
        httpMock.verify();
    });

    it('should getLists() and GET', () => {
        service
            .getTodoLists()
            .subscribe(todos => expect(todos).toEqual([firstList]));

        const request = httpMock.expectOne('/lists');

        expect(request.request.method).toEqual('GET');
        request.flush([firstList]);
        httpMock.verify();
    });

    afterEach(() => {
        httpMock.verify();
    });
});
