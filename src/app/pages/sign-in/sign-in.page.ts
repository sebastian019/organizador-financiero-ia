import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: false,
})
export class SignInPage implements OnInit {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    if (this.formulario.invalid) {
      return;
    }

    const { email, password } = this.formulario.value;

    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);
        // Redirige al menú principal después del login.
        window.location.href = '/menu-principal';
      },
      error: (err) => {
        console.error('Error en el login', err);
        alert(err.error.error || 'Credenciales inválidas');
      }
    });
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}
