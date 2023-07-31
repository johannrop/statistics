import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  /**
   * @param token 
   * method for save the token in local storage
   */
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * @param getItem 
   * method for send token
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * @param clearToken 
   * method for delete the token in local storage
   */
  clearToken() {
    localStorage.removeItem('token');
  }
}
