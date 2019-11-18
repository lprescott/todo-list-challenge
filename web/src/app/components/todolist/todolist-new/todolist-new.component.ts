import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';

@Component({
  selector: 'app-list-new',
  templateUrl: './todolist-new.component.html',
  styleUrls: ['./todolist-new.component.scss']
})
export class TodolistNewComponent implements OnInit {

  // outputs addList via an event emitter to todolist-list
  @Output() addList: EventEmitter<any> = new EventEmitter<any>();

  // input the current user from the above todolist-list component
  @Input() user: User;

  // The two-way data-binded name of new todolist
  name: string;

  constructor(
    private userService: UserService,
    private aroute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    // get current user id
    const id = Number(this.aroute.snapshot.params.uid);

    // create list object
    const list = {
      name: this.name,
      user: undefined
    };

    // get user by id, then set many to one relationship and emit
    this.userService.getUser(id).subscribe(user => {
      list.user = user;
      this.addList.emit(list);
    });

    // reset name
    this.name = undefined;
  }

  // redirect to homepage
  logout() {
    this.route.navigate(['']);
  }
}
