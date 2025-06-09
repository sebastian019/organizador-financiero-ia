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
  mostrarFormulario = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
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
    fetch('http://localhost:3000/api/familia/agregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        username: formData.username,
      }),
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error.message);
      alert('Error al registrar usuario: ' + error.message);
    });
    this.ocultarForm();
  }

  editarMiembro(miembro: any){
    const formData = this.formulario.value;
    fetch(`http://localhost:3000/api/familia/editar/${miembro.id_usuario}`, {
      method: 'PUT',
      headers: {     'Content-Type': 'application/json' },
      body: JSON.stringify({
        apodo: formData.apodo,
      }),
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
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
        //console.log('Data recibida:', data);
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

  irAMiembro(){};
}
