import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-botones-inicio',
  templateUrl: './botones-inicio.component.html',
  styleUrls: ['./botones-inicio.component.scss'],
  standalone:false
})
export class BotonesInicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  // Función para el botón "Iniciar sesión"
  iniciarSesion() {
    console.log('Iniciar sesión');
    // Aquí iría la lógica de inicio de sesión
  }

  // Función para el segundo botón
  otraAccion() {
    console.log('Otra acción');
    // Aquí iría la lógica para otro botón
  }
}
