import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User


  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authService: AuthService,private router: Router) { 
      this.user=new User();
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  loginSubmit(){
    //console.log(this.user)
    this.authService.loginIn(this.user).subscribe(response=>{
      if(response.status==200){
        this.router.navigate(["/home"])
      }
      return response;
    }
    )
       
  }

}
