import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  private apiUrl = `https://damp-spire-59848.herokuapp.com/api/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  loginUser(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile(){
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
    .pipe(
      tap(user => {
        this.user.next(user);
        console.log('getProfile',user);
      })
    );
  }
  
  loginAndGet(email: string, password: string){
    return this.loginUser(email, password).pipe(
      switchMap(() => this.getProfile())
    )
  }

  logout(){
    this.tokenService.removeToken();
  }
}
