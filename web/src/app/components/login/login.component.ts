import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
  }

  // styling for username input
  stylesObj = { 'border-left': '5px solid #FF605C' };

  // the components formgroup
  loginForm: FormGroup;

  ngOnInit() {
    // log out if logged in
    if (sessionStorage.getItem('uid') !== null) {
      sessionStorage.removeItem('uid');
    }
  }

  onSubmit() {
    // find user (if it exists) and redirect
    this.userService.login(this.loginForm.controls.username.value).subscribe(user => {
      this.route.navigate(['/user/' + user.id]).then(r => {
        sessionStorage.setItem('uid', String(user.id));
        console.log('logged on with uid: ' + user.id);
      });
    }, error => {
      swal.fire({
        title: 'Incorrect Login Information',
        icon: 'error'
      });
    });
  }
}
