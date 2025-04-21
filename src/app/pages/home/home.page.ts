import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})


export class HomePage {
    constructor(private router: Router) { }
  
    iniciarSesion() {
    //console.log('Iniciar sesión');
    this.router.navigate(['/sign-in']);
  }

  // Función para el segundo botón
  registrarse() {
    //console.log('Registrarce');
    this.router.navigate(['/register']);
  }
}
