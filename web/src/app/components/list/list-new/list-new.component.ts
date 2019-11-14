import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/User';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.scss']
})
export class ListNewComponent implements OnInit {
  @Output() addList: EventEmitter<any> = new EventEmitter<any>();
  @Input() user: User;

  name: string;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {}

  onSubmit() {
    const id = Number(this.route.snapshot.params.id);
    const list = {
      name: this.name,
      user: undefined
    };

    this.userService.getUser(id).subscribe(user => {
      list.user = user;
      this.addList.emit(list);
    });

    this.name = undefined;
  }
}
