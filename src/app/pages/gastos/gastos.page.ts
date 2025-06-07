import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
  standalone: false
})
export class GastosPage {
  formulario: FormGroup;
  selectedFile: File | null = null;
  mensaje = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.formulario = this.fb.group({});
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('archivo', this.selectedFile);

    // Recupera el token del localStorage (o donde lo guardes)
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost:3000/api/gastos/subir-cartola', formData, { headers })
      .subscribe({
        next: (res: any) => {
          this.mensaje = 'Cartola cargada exitosamente.';
          setTimeout(() => {
            this.router.navigate(['/lista-gastos']);
          }, 1000); // espera un segundo para mostrar mensaje
        },
        error: (err) => {
          this.mensaje = 'Error al cargar la cartola: ' + (err.error?.error || err.message);
        }
      });
  }
}
