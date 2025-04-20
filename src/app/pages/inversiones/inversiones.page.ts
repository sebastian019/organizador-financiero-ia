import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.page.html',
  styleUrls: ['./inversiones.page.scss'],
  standalone: false
})
export class InversionesPage implements OnInit {

  constructor(private router: Router) { }

  acciones = [
    { nombre: 'Apple (AAPL)', cambio: 1.2 },
    { nombre: 'Microsoft (MSFT)', cambio: -0.8 },
    { nombre: 'Amazon (AMZN)', cambio: 2.5 },
    { nombre: 'Tesla (TSLA)', cambio: -1.3 },
    { nombre: 'Google (GOOGL)', cambio: 0.0 }
  ];

  fondos = [
    {
      nombre: 'Fondo Mutuo A',
      datos: [10, 15, 20, 18, 22]
    },
    {
      nombre: 'Fondo Mutuo B',
      datos: [8, 9, 14, 13, 17]
    },
    {
      nombre: 'Fondo Mutuo C',
      datos: [12, 11, 16, 20, 25]
    }
  ];

  activoIndex = 0;

  get fondoActivo() {
    return this.fondos[this.activoIndex];
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
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

  public lineChartType: ChartType = 'line';

  actualizarGrafico() {
    const fondo = this.fondoActivo;
    this.lineChartData.datasets[0].data = fondo.datos;
    this.lineChartData.datasets[0].label = fondo.nombre;
  }

  siguienteFondo() {
    if (this.activoIndex < this.fondos.length - 1) {
      this.activoIndex++;
    } else {
      this.activoIndex = 0;
    }
    this.actualizarGrafico();
  }

  anteriorFondo() {
    if (this.activoIndex > 0) {
      this.activoIndex--;
    } else {
      this.activoIndex = this.fondos.length - 1;
    }
    this.actualizarGrafico();
  }
  
  irAOpciones() {
    this.router.navigate(['/opciones']);
  }  

  irConsultaGpt() {
    this.router.navigate(['/consulta-gpt']);
  }

  irAMenuPrincipal(){
    this.router.navigate(['/menu-principal']);
  }

  ngOnInit() {
    this.actualizarGrafico();
  }

}
