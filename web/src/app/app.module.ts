import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [ UserService, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
