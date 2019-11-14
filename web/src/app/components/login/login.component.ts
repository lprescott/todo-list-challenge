import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  stylesObj = {'border-left': '5px solid #FF605C'};

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('user') !== null) {
      sessionStorage.removeItem('user');
    }
  }

  onSubmit() {
    let success = false;
    this.userService.getUsers().subscribe(users => {
      users = users.filter(user => {
        if (this.username === user.name) {
          sessionStorage.setItem('user', String(user.id));
          this.route.navigate(['/home/' + user.id]);
          success = true;
        }
      });
      if (success === false) {
        swal.fire({
          title: 'Incorrect Login Information',
          icon: 'error'
        });
      }
    });
  }
}
