import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* burnt user data */
  private burnedUser = {
    username: 'admin',
    password: 'admin123',
  };

  constructor(private token : TokenService, private router : Router){ }

  /**
   * @param authentication
   * method for auth, verifiqued what user and pass is correct
   */
  authentication(username: string, password: string) {
    if (username === this.burnedUser.username && password === this.burnedUser.password){
      this.token.saveToken("token");
      this.router.navigate(['/app-dashboard']);
    }else{
      alert("Contraseña o usuario incorrectos")
    }

  }

}
