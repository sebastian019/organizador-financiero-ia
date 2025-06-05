import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'; // Importa MenuController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false // Como lo tenías
})
export class HomePage {
  constructor(
    private router: Router,
    private menuCtrl: MenuController // Inyecta MenuController
  ) {}

  ionViewWillEnter() {
    // Deshabilita el menú lateral con el ID 'main-options-menu' (o el ID que le diste)
    this.menuCtrl.enable(false, 'main-options-menu');
    // También deshabilita el gesto de swipe para este menú
    this.menuCtrl.swipeGesture(false, 'main-options-menu');
  }

  iniciarSesion() {
    this.router.navigate(['/sign-in']);
  }

  registrarse() {
    this.router.navigate(['/register']);
  }
}