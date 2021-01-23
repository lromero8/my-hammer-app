import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../services/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error_array : Array<string> = [];


  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { 
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe(
      data => {
        // console.log(data)
        this.signupForm.reset()
        this.router.navigate(['sign-in']);
      },
      error => {
        // console.log(error)
        let temp_array = error.error;
        this.error_array = [];
        for (let index = 0; index < temp_array.length; index++) {
          // console.log(temp_array[index].msg);
          this.error_array.push(temp_array[index].msg);
        }
        
        if(error.status == 500){
          this.error_array.push(error.error.error.message);
        }

      }
    );
  }

}
