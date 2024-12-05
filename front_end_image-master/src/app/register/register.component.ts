import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  user = { username: '', email: '', password: '' }; // Propriété user

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
  const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegister() {
    if (this.myForm.valid) {
      console.log('Utilisateur enregistree:', this.user);
this.authService.register(this.user).subscribe(
  (data)=>{
    console.log(data);
    this.router.navigate(['/login']);
  },
  (error)=>{
    console.log(error);
  }
)
    }
  }
}
