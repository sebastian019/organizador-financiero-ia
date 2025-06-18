import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
// Nos aseguramos de que el componente NO sea standalone
// para que pueda ser declarado en familia.module.ts
@Component({
  selector: 'app-familia',
  templateUrl: './familia.page.html',
  styleUrls: ['./familia.page.scss'],
  standalone: false,
})
export class FamiliaPage implements OnInit {
  formulario!: FormGroup;
  miembros: any[] = [];
  mostrarFormulario = false;
  username: string = ''; // Añadido para que no de error en el template

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      // El formulario en tu HTML no usa 'username', así que lo comentamos por ahora
      // para evitar errores si lo añades después.
      // Si tienes un campo para 'apodo' o similar, ponlo aquí.
      // Por ejemplo: apodo: [''],
      email: ['', Validators.required], // Suponiendo que el formulario pide un email para agregar
    });
    this.obtenerMiembros();
  }

  irAMenuPrincipal(){
    this.ocultarForm();
    this.router.navigate(['/menu-principal']);
  }

  agregarMiembro(){
    const formData = this.formulario.value;
    const token = localStorage.getItem('token');
    // El backend espera un 'email', no un 'username' para agregar.
    // Asegúrate que tu formulario tenga un campo para el email.
    fetch('http://localhost:3000/api/familia/agregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        email: formData.email, // Usamos el email del formulario
      }),
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      this.obtenerMiembros(); // Recargamos la lista después de agregar
    })
    .catch((error) => {
      console.error('Error al agregar miembro:', error.message);
      alert('Error al agregar miembro: ' + error.message);
    });
    this.ocultarForm();
  }

  editarMiembro(miembro: any){
    const formData = this.formulario.value;
    fetch(`http://localhost:3000/api/familia/editar/${miembro.id_usuario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apodo: formData.apodo,
      }),
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      this.obtenerMiembros(); // Recargamos la lista
    })
    .catch((error) => {
      console.error('Error al actualizar usuario:', error.message);
      alert('Error al actualizar usuario: ' + error.message);
    });
    this.ocultarForm();
  }

  borrarMiembro(miembro: any) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/api/familia/eliminar/${miembro.id_usuario}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      this.miembros = this.miembros.filter(m => m.id_usuario !== miembro.id_usuario);
      alert('Familiar eliminado exitosamente');
    })
    .catch((error) => {
      console.error('Error al eliminar usuario:', error.message);
      alert('Error al eliminar usuario: ' + error.message);
    });
    this.ocultarForm();
  }

  obtenerMiembros() {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/api/familia/listar`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        this.miembros = data;
      })
      .catch(error => {
        console.error('Error al obtener miembros:', error);
        alert('Error al obtener miembros');
      });
  }

  mostrarForm() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  ocultarForm() {
    this.mostrarFormulario = false;
  }
}