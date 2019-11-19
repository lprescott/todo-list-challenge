import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-new',
  templateUrl: './todolist-new.component.html',
  styleUrls: ['./todolist-new.component.scss']
})
export class TodolistNewComponent implements OnInit {
  constructor(
    private userService: UserService,
    private aroute: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.newListForm = formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
      ]
    });
  }

  // outputs addList via an event emitter to todolist-list
  @Output() addList: EventEmitter<any> = new EventEmitter<any>();

  // input the current user from the above todolist-list component
  @Input() user: User;

  // the components formgroup
  newListForm: FormGroup;

  ngOnInit() {}

  onSubmit() {
    // get current user id
    const id = Number(this.aroute.snapshot.params.uid);

    // create list object
    const list = {
      name: this.newListForm.controls.name.value,
      user: undefined
    };

    // get user by id, then set many to one relationship and emit
    this.userService.getUser(id).subscribe(user => {
      list.user = user;
      this.addList.emit(list);
    });

    // reset name
    this.newListForm.reset();
  }

  // redirect to homepage
  logout() {
    this.route.navigate(['']);
  }
}
