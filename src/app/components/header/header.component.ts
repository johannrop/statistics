import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router : Router, private token: TokenService){}

  /**
   * @logOut
   * function for log'out 
   * clear the token and go to login
   */
  logOut(){
    this.token.clearToken();
    this.router.navigate(['/app-login']);
  }

}
