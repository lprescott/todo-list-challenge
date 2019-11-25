import { JwtService } from './../../../services/security/jwt.service';
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
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
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
      user: this.user
    };

    // assign user and emit
    this.addList.emit(list);

    // reset name
    this.newListForm.reset();
  }

  // redirect to homepage
  logout() {
    document.cookie = 'jwt=;';
    this.jwtService.setLoggedIn(false);
    this.route.navigate(['']);
    console.log('Successfully logged out.');
  }
}
