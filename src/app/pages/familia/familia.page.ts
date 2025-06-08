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
  miembros: any[] = [];

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
    this.obtenerMiembros();
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

  editarMiembro(miembro: any){
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

  borrarMiembro(miembro: any) {
    fetch(`http://localhost:3000/api/familia/eliminar/${miembro.id_usuario}`, {
      method: 'DELETE'
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      // Opcional: actualizar la lista sin recargar
      this.miembros = this.miembros.filter(m => m.id_usuario !== miembro.id_usuario);
      alert('Familiar eliminado exitosamente');
    })
    .catch((error) => {
      console.error('Error al eliminar usuario:', error.message);
      alert('Error al eliminar usuario: ' + error.message);
    });
  }

  obtenerMiembros() {
    fetch(`http://localhost:3000/api/familia/listar`)
      .then(res => res.json())
      .then(data => {
        this.miembros = data;
      })
      .catch(error => {
        console.error('Error al obtener miembros:', error);
        alert('Error al obtener miembros');
      });
  }

  irAMiembro(){};
}
