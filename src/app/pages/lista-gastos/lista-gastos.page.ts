import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../services/gastos.service';
import { Router } from '@angular/router'; // Asegúrate de tener esto


@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.page.html',
  styleUrls: ['./lista-gastos.page.scss'],
  standalone: false
})
export class ListaGastosPage implements OnInit {
  datos: any[] = [];
  dataGastos: any;
  dataAbonos: any;
  cargando = true;
  mensaje = '';

  constructor(private gastosService: GastosService, private router: Router) {}

  ngOnInit() {
    this.gastosService.obtenerGastosAgrupados().subscribe({
      next: (res) => {
        this.datos = res;

        const gastosFiltrados = res.filter((g: any) => g.totalGastos > 0);
        const abonosFiltrados = res.filter((g: any) => g.totalAbonos > 0);

        this.dataGastos = {
          labels: gastosFiltrados.map(g => g.descripcion),
          datasets: [{
            data: gastosFiltrados.map(g => g.totalGastos),
            backgroundColor: this.generarColores(gastosFiltrados.length)
          }]
        };

        this.dataAbonos = {
          labels: abonosFiltrados.map(g => g.descripcion),
          datasets: [{
            data: abonosFiltrados.map(g => g.totalAbonos),
            backgroundColor: this.generarColores(abonosFiltrados.length)
          }]
        };

        this.cargando = false;
      },
      error: (err) => {
        this.mensaje = 'No se pudieron cargar los datos.';
        this.cargando = false;
      }
    });
  }

 irASubirCartola() {
    this.router.navigate(['/gastos'], { queryParams: { nueva: true } });
  }


  generarColores(cantidad: number): string[] {
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
      const hue = Math.floor((360 / cantidad) * i);
      colores.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colores;
  }
}
