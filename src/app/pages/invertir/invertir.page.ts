import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invertir',
  templateUrl: './invertir.page.html',
  styleUrls: ['./invertir.page.scss'],
  standalone: false
})
export class InvertirPage implements OnInit {

  accion = {
    nombre: '',
    symbol: '',
    precio: 0,
    cambio: 0
  };

  cantidad: number = 1;

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['accionSeleccionada']) {
      this.accion = navigation.extras.state['accionSeleccionada'];
    }
  }

  aumentar() {
    this.cantidad++;
  }

  disminuir() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  onCantidadChange(event: any) {
    const val = parseInt(event.detail.value, 10);
    this.cantidad = (!isNaN(val) && val > 0) ? val : 1;
  }

  volver() {
    this.router.navigate(['/inversiones']);
  }

  comprar() {
    console.log(`Comprar ${this.cantidad} acciones de ${this.accion.nombre}`);
  }
}
