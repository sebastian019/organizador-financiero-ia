import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.page.html',
  styleUrls: ['./familia.page.scss'],
  standalone:false
})
export class FamiliaPage implements OnInit {
  formulario!: FormGroup;
  miembros = [
    { nombre: 'Juan', edad: 30 },
    { nombre: 'María', edad: 25 },
    { nombre: 'Pedro', edad: 35 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  irAMenuPrincipal(){
    this.router.navigate(['/menu-principal']);
  }

  agregarMiembro(){
    const formData = this.formulario.value;
    fetch('http://localhost:3000/api/familia/agregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email
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
  }

  editarMiembro(){
    const formData = this.formulario.value;
    fetch(`http://localhost:3000/api/familia/editar/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email
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
      console.error('Error al actualizar usuario:', error.message);
      alert('Error al actualizar usuario: ' + error.message);
    });
  }

  borrarMiembro(){
    const formData = this.formulario.value;
    fetch(`http://localhost:3000/api/familia/eliminar/${formData.id}`, {
      method: 'DELETE'
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
  }

  irAMiembro(){};
}
