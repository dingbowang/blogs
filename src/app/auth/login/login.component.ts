import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { Constant } from "../../../const";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User;
  errorMessage: string="";
  errorShow:boolean=false;

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService,private router: Router) { 
      this.user=new User();
  }

  ngOnInit(): void {
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  loginSubmit(){
    //console.log(this.user)
    this.authService.loginIn(this.user).subscribe(
      response=>{
      if(response.status==200 && response.body?.code == 200){
        console.log("successed");
        //const msg = response.body?.msg
        this.router.navigate(["/home"])
      } 

      //this.errorMessage=response.body?.msg== "" ? "" : response.body?.msg
      this.errorMessage=JSON.stringify(response.body?.msg)
      this.errorShow=true;
    },
      error=>{
        const status = error.status;
        switch (status) {
          case Constant.HTTPStatus.INTERNAL_SERVER_ERROR:
            this.errorMessage=="系统异常"
            this.errorShow=true;
            break;
          case Constant.HTTPStatus.GATEWAY_TIMEOUT:
            this.errorMessage=="服务器断开";
            this.errorShow=true;
            break;
          case Constant.HTTPStatus.FAIL:
            this.errorMessage=="";
            this.errorShow=true;
            break;
          default:
            this.errorMessage==error.body;
            this.errorShow=true;
            break;
        }
      }
    )
       
  }

}
