import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user: User;

  faSignOutAlt = faSignOutAlt;

  constructor() { }

  ngOnInit() {
  }

}
