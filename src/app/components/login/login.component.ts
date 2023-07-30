import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
    export class LoginComponent {

      user: string = '';
      pass: string = '';

      constructor(private authService: AuthService) { }

      login(){
        this.authService.authentication(this.user,this.pass);
      }

}
