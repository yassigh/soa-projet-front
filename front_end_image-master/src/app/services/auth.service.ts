import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  apiURL: string = 'http://localhost:8081/films/auth';
  token!: string;
  loggedUser!: string;
  isloggedIn: boolean = true;
  roles!: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }
  registerUser(user :User){
    return this.http.post(`${this.apiURL}/register`, user);}
  saveToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT(): void {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  logout(): void {
this.loggedUser = undefined!;
 this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = true;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }

  getToken(): string | null {
    return this.token;
  }
  loadToken() {
    
    const token = localStorage.getItem('jwt');
    console.log('Token charge:', token);
    return token;
  }
  
    
    isAdmin(): Boolean {
      this.roles = localStorage.getItem('roles') || '';  
      return this.roles.includes('admin');
    }
    setLoggedUserFromLocalStorage(login : string) {
      this.loggedUser = login;
      this.isloggedIn = true;
     
      }
     
      
}
