import { Component } from '@angular/core';
import { AuthService } from './services/shared/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService, public router: Router) { }

  title = 'my-hammer-app';

  logout() {
    this.authService.doLogout()
  }

  goToDashboard(){
    let uid = localStorage.getItem('uid')
    this.router.navigate(['dashboard/' + uid]);
  }

}
