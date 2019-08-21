import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import {
  SESSION_STORAGE,
  StorageServiceModule
} from 'angular-webstorage-service';
import { LoginService } from './auth.service';
import { Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { RouterTestingModule } from '@angular/router/testing';


describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, StorageServiceModule],
      providers: [LoginService, { provide: SESSION_STORAGE }]
    });
  });

  // it('should be created', inject([LoginService], (service: LoginService) => {
  //   expect(service).toBeTruthy();
  // }));
});
