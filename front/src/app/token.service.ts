import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private decodedToken: any;

  constructor() { }

  decodeToken(token: string) {
    this.decodedToken = jwt_decode(token);
  }

  getDecodedToken() {
    return this.decodedToken;
  }
}
