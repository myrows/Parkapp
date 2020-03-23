import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginDto } from '../dto/loginDto.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDto : LoginDto;

  constructor(private authentication: AuthService, private router: Router, private snackBar: MatSnackBar,public jwtHelper: JwtHelperService) { 
    this.loginDto = new LoginDto('', '', 'password');
  }

  ngOnInit() {
  }

  login() {
    this.authentication.login(this.loginDto).subscribe(resul => {
      this.authentication.setToken(resul.access_token);
      this.authentication.setTokenRefres(resul.refresh_token);
      console.log(this.jwtHelper.decodeToken(this.authentication.getToken()));
      //this.router.navigate(['/']);
      
    },
    error => {
        this.snackBar.open('Authentication failed.');
    });
  }

}
