import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  errorMessage: string = '';
  err: number = 0;
  roles:string= '';
  constructor(private authService: AuthService, private router: Router) {}

  onLoggedin(): void {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log(response);
       this.roles=response.user.roles;
       this.authService.saveToken(response.token);
       console.log(this.roles);
       localStorage.setItem('roles',this.roles);
        this.router.navigate(['/films']);
      },
      (err) => {
        console.log(err, this.user);
        this.errorMessage = 'Erreur de connexion, veuillez vérifier vos informations.';
      }
    );
  }
}
