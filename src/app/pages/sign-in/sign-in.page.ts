import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: false,
})
export class SignInPage implements OnInit {
  formulario!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.formulario.valid) {
      //console.log(this.formulario.value);
      this.router.navigate(['/menu-principal']);
    }
    this.router.navigate(['/menu-principal']);
  }
}
