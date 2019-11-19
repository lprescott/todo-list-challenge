import { TestBed } from '@angular/core/testing';

import { JwtService } from './jwt.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [BrowserModule, HttpClientModule, HttpClientTestingModule],
    providers: [JwtService]
  }));

  it('should be created', () => {
    const service: JwtService = TestBed.get(JwtService);
    expect(service).toBeTruthy();
  });
});
