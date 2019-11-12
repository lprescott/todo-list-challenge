import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('An attempt to login with: \'' + this.username + '\' was received.');
  }
}
