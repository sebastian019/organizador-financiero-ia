import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartType, ChartOptions} from 'chart.js';
import { InversionesService } from 'src/app/services/inversiones.service';
import { ModalController } from '@ionic/angular';
import { ModalGraficoComponent } from 'src/app/modal-grafico/modal-grafico.component';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.page.html',
  styleUrls: ['./inversiones.page.scss'],
  standalone: false
})
export class InversionesPage implements OnInit {

  acciones = [
    { nombre: 'Apple (AAPL)', symbol: 'AAPL', cambio: 0, precio: 0 },
    { nombre: 'Microsoft (MSFT)', symbol: 'MSFT', cambio: 0, precio: 0 },
    { nombre: 'Amazon (AMZN)', symbol: 'AMZN', cambio: 0, precio: 0 },
    { nombre: 'Tesla (TSLA)', symbol: 'TSLA', cambio: 0, precio: 0 },
    { nombre: 'Google (GOOGL)', symbol: 'GOOGL', cambio: 0, precio: 0 },
    { nombre: 'Meta (META)', symbol: 'META', cambio: 0, precio: 0 },
    { nombre: 'NVIDIA (NVDA)', symbol: 'NVDA', cambio: 0, precio: 0 },
    { nombre: 'Netflix (NFLX)', symbol: 'NFLX', cambio: 0, precio: 0 },
    { nombre: 'Intel (INTC)', symbol: 'INTC', cambio: 0, precio: 0 },
    { nombre: 'Adobe (ADBE)', symbol: 'ADBE', cambio: 0, precio: 0 },
  ];


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  public lineChartType: 'line' = 'line';

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
  };
  activoIndex = 0;

  constructor(private router: Router, private inversionesService: InversionesService, private modalCtrl: ModalController) { }

    intervalId: any;

    ngOnInit() {
      this.cargarDatosTodasLasAcciones();  // Solo maneja acciones
      this.cargarDatosParaGrafico();       // Solo maneja gráfico

      this.intervalId = setInterval(() => {
      this.cargarDatosTodasLasAcciones();
      }, 2 * 60 * 1000); // cada 2 minutos
    }

    async abrirModal(accion: any) {
      const modal = await this.modalCtrl.create({
        component: ModalGraficoComponent,
        componentProps: { accion }
     });
      await modal.present();
    }
  cargarDatosTodasLasAcciones() {
    this.acciones.forEach((accion, index) => {
      this.inversionesService.obtenerDatosAccion(accion.symbol).subscribe(response => {
        const valores = response.values || [];
          if (valores.length >= 2) {
          const ultimo = Number(valores[0].close);
          const anterior = Number(valores[1].close);
          const cambio = ((ultimo - anterior) / anterior) * 100;
          this.acciones[index].precio = Number(ultimo.toFixed(2));
          this.acciones[index].cambio = Number(cambio.toFixed(2));
        }
      }, error => {
        console.error(`Error cargando datos de ${accion.symbol}:`, error);
      });
    });
  }

  cargarDatosParaGrafico() {
    const accion = this.acciones[this.activoIndex];
    this.inversionesService.obtenerDatosAccion(accion.symbol).subscribe(response => {
      const valores = response.values || [];
      this.lineChartData.labels = valores.map((v: any) => v.datetime).reverse();
      this.lineChartData.datasets[0].data = valores.map((v: any) => Number(v.close)).reverse();
      this.lineChartData.datasets[0].label = accion.nombre;
    }, error => {
      console.error('Error cargando datos para el gráfico:', error);
    });
  }


  actualizarCambio(valores: any[]) {
  if (valores.length < 2) return;
  const ultimo = Number(valores[0].close);
  const anterior = Number(valores[1].close);
  const cambio = ((ultimo - anterior) / anterior) * 100;
  this.acciones[this.activoIndex].cambio = Number(cambio.toFixed(2));
  this.acciones[this.activoIndex].precio = Number(ultimo.toFixed(2));
}


  siguienteAccion() {
    this.activoIndex = (this.activoIndex + 1) % this.acciones.length;
    this.cargarDatosParaGrafico();
  }

  anteriorAccion() {
    this.activoIndex = (this.activoIndex - 1 + this.acciones.length) % this.acciones.length;
    this.cargarDatosParaGrafico();
  }

  irAOpciones() {
    this.router.navigate(['/opciones']);
  }

  irConsultaGpt() {
    this.router.navigate(['/consulta-gpt']);
  }

  irAMenuPrincipal() {
    this.router.navigate(['/menu-principal']);
  }
}
