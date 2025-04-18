import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.page.html',
  styleUrls: ['./inversiones.page.scss'],
  standalone: false,
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
    { nombre: 'Fondo Mutuo A', datos: [] },
    { nombre: 'Fondo Mutuo B', datos: [] },
    { nombre: 'Fondo Mutuo C', datos: [] },
  ];

  activoIndex = 0;

  siguienteFondo() {
    if (this.activoIndex < this.fondos.length - 1) {
      this.activoIndex++;
    } else {
      this.activoIndex = 0;
    }
  }

  anteriorFondo() {
    if (this.activoIndex > 0) {
      this.activoIndex--;
    } else {
      this.activoIndex = this.fondos.length - 1;
    }
  }

  irConsultaGpt(){
    this.router.navigate(['/consulta-gpt']);
  }

  ngOnInit() { }

}
