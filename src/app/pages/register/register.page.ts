import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      rut: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  register() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;

      // Enviar datos al backend
      fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          rut: formData.rut,
          region: formData.region,
          comuna: formData.comuna,
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Error desconocido');
          }
          // Registro exitoso, redirige al login
          this.router.navigate(['/sign-in']);
        })
        .catch((error) => {
          console.error('Error al registrar usuario:', error.message);
          alert('Error al registrar usuario: ' + error.message);
        });
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}
