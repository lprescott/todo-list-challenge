import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../services/security/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
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

  // styling for username input
  stylesObj = { 'border-left': '5px solid #FF605C' };

  // the components formgroup
  loginForm: FormGroup;

  // the response from the server
  private json: any;

  ngOnInit() {
    // log out if logged in
    if (sessionStorage.getItem('jwt') !== null) {
      sessionStorage.removeItem('jwt');
    }
  }

  onSubmit() {
    // find user (if it exists) and redirect
    this.jwtService.login(this.loginForm.controls.username.value).subscribe(
      returnable => {
        console.log(returnable);

        // get and store jwt if login was successful
        try {
          this.json = JSON.parse(returnable);
        } catch (e) {
          this.json = returnable;
        }

        this.route.navigate(['/user/' + this.json.user.id]).then(r => {
          sessionStorage.setItem('jwt', String(this.json.jwt));
          console.log('logged on with uid: ' + this.json.user.id);
        });
      },
      error => {
        swal.fire({
          title: 'Incorrect Login Information',
          icon: 'error'
        });
      }
    );
  }
}
