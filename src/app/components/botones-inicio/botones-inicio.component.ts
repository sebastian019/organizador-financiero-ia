import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botones-inicio',
  templateUrl: './botones-inicio.component.html',
  styleUrls: ['./botones-inicio.component.scss'],
  standalone:false
})
export class BotonesInicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  iniciarSesion() {
    //console.log('Iniciar sesión');
    this.router.navigate(['/sign-in']);
  }

  registrarse() {
    //console.log('Registrarce');
    this.router.navigate(['/register']);
  }

  /*ingresar() {
    console.log('Ingresar');
    this.router.navigate(['/ingresar']);
  }*/
}
