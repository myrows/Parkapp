import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: string = localStorage.getItem('token');

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

}
