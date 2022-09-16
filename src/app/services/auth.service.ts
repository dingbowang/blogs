import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';


const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  // 狗东西,要加别名来重新覆盖数据类型
  // 返回的数据格式,response有code和message
  observe:'response' as 'response',
  //返回的数据类型
  responseType:'json' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  api= environment.baseUrl;

  constructor(private http: HttpClient) { }


  loginIn(user: User) {
    console.log(111)
    return this.http.post<User>(this.api+'/stoneUser/login',user,httpOptions)
    

  }
}
