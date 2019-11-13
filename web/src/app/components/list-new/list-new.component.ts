import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.scss']
})
export class ListNewComponent implements OnInit {

  @Output() addList: EventEmitter<any> = new EventEmitter<any>();

  name: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

    const list = {
      name: this.name,
      todos: []
    };

    this.addList.emit(list);

    this.name = undefined;
  }
}
