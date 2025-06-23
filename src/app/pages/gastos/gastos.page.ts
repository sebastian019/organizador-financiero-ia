import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { GastosService } from 'src/app/services/gastos.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
  standalone: false
})
export class GastosPage implements OnInit {
  formulario: FormGroup;
  selectedFile: File | null = null;
  mensaje = '';
  esNuevaCartola = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private gastosService: GastosService,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {
    this.formulario = this.fb.group({});
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.esNuevaCartola = params['nueva'] === 'true';

      if (!this.esNuevaCartola) {
        this.gastosService.verificarCartolaCargada().subscribe({
          next: (res) => {
            if (res.cargada) {
              this.router.navigate(['/lista-gastos']);
            }
          },
          error: (err) => {
            console.error('Error al verificar cartola cargada:', err);
          }
        });
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const hoja = workbook.SheetNames[0];
        const hojaExcel = XLSX.utils.sheet_to_json(workbook.Sheets[hoja], { header: 1 }) as any[][];

        const columnasEsperadas = ["Fecha", "Descripción", "N° Operación", "Abonos", "Cargos", "Saldo"];
        const filaEncabezadoIndex = hojaExcel.findIndex((fila: any[]) =>
          columnasEsperadas.every(col => fila.includes(col))
        );

        if (filaEncabezadoIndex === -1) {
          alert("El archivo no parece ser una cartola válida de BancoEstado.");
          this.selectedFile = null;
          return;
        }

        this.selectedFile = file;
      };

      reader.readAsArrayBuffer(file);
    }
  }

  onSubmit() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('archivo', this.selectedFile);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost:3000/api/gastos/subir-cartola', formData, { headers })
      .subscribe({
        next: async (res: any) => {
          await this.mostrarToast('Cartola cargada exitosamente.', 'success');
          setTimeout(() => {
            this.router.navigate(['/lista-gastos']);
          }, 1000);
        },
        error: async (err) => {
          if (err.status === 400 && err.error?.error) {
            await this.mostrarToast('Error: ' + err.error.error, 'danger');
          } else if (err.status === 500 && err.error?.error) {
            await this.mostrarToast('Error del servidor: ' + err.error.error, 'danger');
          } else {
            await this.mostrarToast('Error inesperado al cargar la cartola.', 'danger');
          }
        }
      });
  }

  async mostrarToast(mensaje: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

}