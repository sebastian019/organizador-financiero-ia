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

  ngOnInit() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      text:[]
    });
  }

  register() {
    if (this.formulario.valid) {
      console.log(this.formulario.value); // simulás un inicio de sesión
      this.router.navigate(['/menu-principal']);
    }
    this.router.navigate(['/menu-principal']);
  }
}

