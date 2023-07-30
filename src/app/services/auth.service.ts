import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private burnedUser = {
    username: 'admin',
    password: 'admin123',
  };

  constructor(private token : TokenService, private router : Router){ }

  authentication(username: string, password: string) {
    if (username === this.burnedUser.username && password === this.burnedUser.password){
      this.token.saveToken("123456789");
      this.router.navigate(['/app-dashboard']);
    }else{
      alert('Credenciales incorrectas')
    }
  }

  logOut(){
    this.token.clearToken();
  }

}
