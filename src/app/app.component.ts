import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo List Challenge';
  public constructor(private titleService: Title ) {
    this.setTitle(this.title);
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle );
  }
}
