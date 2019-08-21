import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  navItems = navItems;
  constructor(private authService: LoginService, private location: Location, private router: Router) {}

  ngOnInit() {
   this.logoutUser();
  }

  logoutUser() {
   this.authService.logout();
   this.router.navigate(['/']);
  }
}
