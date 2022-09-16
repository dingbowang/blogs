import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
   
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  api= environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }


  loginIn(user: User) {
    console.log(111)
    return this.http.post<User>(this.api+'/stoneUser/login',user,httpOptions)

  }
}
