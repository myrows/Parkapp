import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { BehaviorSubject, empty, of, Subject, EMPTY, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { LoginDto } from '../dto/loginDto.interface';
import { LoginResponse } from '../models/login-response.interface';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private accessTokenSubject: BehaviorSubject<string>

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  login(loginDto? : LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://parkappsalesianos.herokuapp.com/parkapp/login',
      loginDto,
      httpOptions
    );
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public getTokenRefres(): string {
    return localStorage.getItem("tokenRefres");
  }

  public setTokenRefres(token: string) {
    localStorage.setItem("tokenRefres", token);
  }

  public clearToken() {
    localStorage.removeItem("tokenRefres");
    localStorage.removeItem("token");
  }


}
