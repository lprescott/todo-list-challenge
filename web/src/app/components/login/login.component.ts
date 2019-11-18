import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      username: [''],
    });
  }

  // styling for username input
  stylesObj = { 'border-left': '5px solid #FF605C' };

  // the components formgroup
  private loginForm: FormGroup;

  ngOnInit() {
    // log out if logged in
    if (sessionStorage.getItem('uid') !== null) {
      sessionStorage.removeItem('uid');
    }
  }

  onSubmit() {
    let success = false;
    // find user (if it exists) and redirect
    this.userService.getUsers().subscribe(users => {
      users = users.filter(user => {
        if (this.loginForm.controls.username.value === user.name) {
          this.route.navigate(['/user/' + user.id]).then(r => {
            sessionStorage.setItem('uid', String(user.id));
            console.log('logged on with uid: ' + user.id);
          });
          success = true;
        }
      });
      // show error on no users found
      if (success === false) {
        swal.fire({
          title: 'Incorrect Login Information',
          icon: 'error'
        });
      }
    });
  }
}
