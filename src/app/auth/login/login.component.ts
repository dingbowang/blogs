import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  constructor(private authService: AuthService) { 
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
    console.log(this.user)
    this.authService.loginIn(this.user)
        .subscribe(user=>this.user=user)
   
  }

}
