import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.scss']
})
export class ListNewComponent implements OnInit {

  @Input() user: User;
  @Output() addList: EventEmitter<any> = new EventEmitter<any>();

  newListForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cookie: CookieService
  ) {
    this.newListForm = formBuilder.group({
      title: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
      ]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    // create list object
    const list = {
      title: this.newListForm.controls.title.value,
      user: this.user
    };

    // assign user and emit
    this.addList.emit(list);

    // reset name
    this.newListForm.reset();
  }
}
