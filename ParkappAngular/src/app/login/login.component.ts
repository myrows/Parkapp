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
    this.loginDto = new LoginDto('', '');
  }

  ngOnInit() {
  }

  login() {
    this.authentication.login(this.loginDto).subscribe(resul => {
      this.snackBar.open('Sesión iniciada correctamente');
      this.router.navigate(['/zonas']);
      this.setToken(resul.token);
      localStorage.setItem("avatarUser", resul.avatar);
      
    },
    error => {
        this.snackBar.open('El username o la contraseña no son válidos');
    });
  }

  setToken(token : string){
    this.authentication.setToken(token);
  }

}
