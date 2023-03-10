import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `https://api.escuelajs.co/api/v1/users`;

  constructor(private http: HttpClient) { }

  createUser(dto: CreateUserDTO){
    return this.http.post<User>(this.apiUrl, dto)
  }

  getAllUsers(){
    return this.http.get<User[]>(this.apiUrl)
  }

}
