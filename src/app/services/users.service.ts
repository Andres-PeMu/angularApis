import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';



import { User, createUserDTO } from './../models/user.model';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl:string = 'https://young-sands-07814.herokuapp.com/api/users';

  constructor(
    private http: HttpClient
  ) { }

  create(dto:createUserDTO){
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll(){
    return this.http.get<User>(this.apiUrl);
  }

}
