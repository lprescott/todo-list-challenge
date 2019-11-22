import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../services/security/jwt.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private jwtService: JwtService
  ) {
    this.loginForm = formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
      ]
    });
  }

  // the components formgroup
  loginForm: FormGroup;

  // the response from the server
  private json: any;

  // function to receive a cookie by name
  static getCookie(name) {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  ngOnInit() {}

  onSubmit() {
    // find user (if it exists) and redirect
    this.jwtService.login(this.loginForm.controls.username.value).subscribe(
      returnable => {

        // parse return
        this.json = returnable;

        // redirect to user page, and store jwt
        this.route.navigate(['/user/' + this.json.user.id]).then(() => {
          document.cookie = 'jwt=' + String(this.json.jwt);
          console.log('You are logged on.');
        });
      },
      () => {
        // throw alert on incorrect login information
        swal
          .fire({
            title: 'Incorrect Login Information',
            icon: 'error'
          })
          .then(() => console.log('Failed to login.'));
      }
    );
  }
}
