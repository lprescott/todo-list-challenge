import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../models/User';

describe('UserService', () => {
    // create a mock httpMock object and service used for testing
    let httpMock: HttpTestingController;
    let service: UserService;

    // create a list for testing
    const firstUser = new User();
    firstUser.id = 1;
    firstUser.username = 'Test User';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, HttpClientModule, HttpClientTestingModule],
            providers: [UserService]
        });

        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(UserService);
    });

    it('should be created', () => {
        service = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });

    it('should addUser() and POST', () => {
        service
            .addUser(firstUser)
            .subscribe(todo => expect(todo).toEqual(firstUser));

        const request = httpMock.expectOne('/users');

        expect(request.request.method).toEqual('POST');
        request.flush(firstUser);
        httpMock.verify();
    });

    it('should updateUser() and PUT', () => {
        service
            .updateUser(firstUser)
            .subscribe(todo => expect(todo).toEqual(firstUser));

        const request = httpMock.expectOne('/users/1');

        expect(request.request.method).toEqual('PUT');
        request.flush(firstUser);
        httpMock.verify();
    });

    it('should deleteUser() and DELETE', () => {
        service
            .deleteUser(firstUser)
            .subscribe(() => expect(null).toEqual(null));

        const request = httpMock.expectOne('/users/1');

        expect(request.request.method).toEqual('DELETE');
        request.flush({});
        httpMock.verify();
    });

    afterEach(() => {
        httpMock.verify();
    });
});
