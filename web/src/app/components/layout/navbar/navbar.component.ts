import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
