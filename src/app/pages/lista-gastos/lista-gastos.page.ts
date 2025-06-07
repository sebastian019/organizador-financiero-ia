import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../services/gastos.service';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.page.html',
  styleUrls: ['./lista-gastos.page.scss'],
  standalone:false
})
export class ListaGastosPage implements OnInit {
  datos: any[] = [];
  labels: string[] = [];
  data: number[] = [];
  cargando = true;
  mensaje = '';

  constructor(private gastosService: GastosService) {}

  ngOnInit() {
    this.gastosService.obtenerGastosAgrupados().subscribe({
      next: (res) => {
        this.datos = res;
        this.labels = res.map((g: any) => g.descripcion);
        this.data = res.map((g: any) => g.totalGastos); // o totalAbonos para otro gráfico
        this.cargando = false;
      },
      error: (err) => {
        this.mensaje = 'No se pudieron cargar los datos.';
        this.cargando = false;
      }
    });
  }
}
