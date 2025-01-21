import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const { email, password } = this.registerForm.value;

    try {
      await this.authService.register(email, password);
      console.log('Inscription réussie');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
