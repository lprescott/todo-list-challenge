import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';
import { CookieService } from 'ngx-cookie-service';
import { TodoList } from '../../models/TodoList';
import { ListService } from '../../services/list/list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user: User;
    lists: TodoList[] = [];

    constructor(
        private userService: UserService,
        private cookie: CookieService,
        private listService: ListService,
        private aroute: ActivatedRoute
    ) {}

    ngOnInit() {
        // get current user
        this.aroute.data.subscribe(data => {
            this.user = data.response.user;
            this.cookie.set('jwt', data.response.jwt);
        });

        // get lists
        this.listService.getTodoLists().subscribe(lists => {
            this.lists = lists.filter(ls => ls.user.id === this.user.id);
        });
    }

    deleteList(list: TodoList) {
        this.listService.deleteTodoList(list).subscribe(() => {
            this.lists = this.lists.filter(ls => ls.id !== list.id);
        });
    }

    addList(list: TodoList) {
        this.listService.addTodoList(list).subscribe(ls => {
            this.lists.push(ls);
        });
    }

    trackByLists(index: number, list: TodoList): number {
        return list.id;
    }
}
