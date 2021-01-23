import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../services/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  http_code: Number = 0;
  message : String = "";


  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }


  ngOnInit(): void {
  }

  loginUser() {

    this.authService.signIn(this.signinForm.value).subscribe(
      data => {
        
        // console.log(data);
        localStorage.setItem('access_token', data.token)
        this.authService.getUserProfile(data._id).subscribe((res) => {
          localStorage.setItem('uid', res.msg._id)
          this.router.navigate(['dashboard/' + res.msg._id]);
        })

      }, 
      
      error => {   
        // console.log(error)
        this.http_code = error.status;
        this.message = error.error.message; 
      },
      
      () => {
        // do something when operation successfully complete
      });


  }

}
