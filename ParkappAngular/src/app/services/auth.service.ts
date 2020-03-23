import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { BehaviorSubject, empty, of, Subject, EMPTY, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { LoginDto } from '../dto/loginDto.interface';
import { LoginResponse } from '../models/login-response.interface';


const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';

const httpOptionsLogin = {//application/x-www-form-urlencoded
  headers: new HttpHeaders().append('Authorization',
    'Basic ' + btoa(`cemapp:secret`)).append('Content-type','application/x-www-form-urlencoded')
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenSubject: BehaviorSubject<string>

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  login(loginDto? : LoginDto): Observable<LoginResponse> {
    const params = new HttpParams()
        .set('username', loginDto.username)
        .set('password', loginDto.password)
        .set('grant_type', 'password');
    return this.http.post<LoginResponse>('http://localhost:9000/oauth/token', params,
      httpOptionsLogin
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
