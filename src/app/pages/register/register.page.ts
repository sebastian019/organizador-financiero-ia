import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  formulario!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  irAHome() {
    this.router.navigate(['/home']);
  }

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

  register() {
    /*if (this.formulario.valid) {
      console.log(this.formulario.value); // simulás un inicio de sesión
      this.router.navigate(['/menu-principal']);
    }*/
    this.router.navigate(['/menu-principal']);
  }
}

