// Ruta: src/app/components/header/header.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Para la navegación del logo
import { CommonModule } from '@angular/common';
import { IonicModule, MenuController } from '@ionic/angular'; // Importa MenuController

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string = 'GEPETE ECONOMICS';
  @Input() showMenuButton: boolean = true; // Para controlar la visibilidad del botón de menú

  // Placeholder: Reemplaza con tu lógica de autenticación real
  public isUserLoggedIn: boolean = true; 

  constructor(
    private menuCtrl: MenuController, // Inyecta MenuController
    private router: Router           // Inyecta Router para la navegación del logo
    // private authService: AuthService // Si necesitas verificar el login
  ) {}

  ngOnInit() {
    // Aquí puedes poner lógica para determinar isUserLoggedIn
    // Ejemplo: this.isUserLoggedIn = this.authService.isAuthenticated();
  }

  navigateToHome() {
    // Navega a la página principal o la que defina el logo
    this.router.navigate(['/menu-principal']); // O la ruta que desees
  }

  // ESTE ES EL MÉTODO QUE PARECE FALTAR O ESTAR MAL EN TU ARCHIVO ACTUAL
  openSideMenu() {
    // Abre el menú lateral que tendrá un menuId específico.
    // Asegúrate de que este menuId coincida con el que definas en <ion-menu> en app.component.html.
    this.menuCtrl.open('main-options-menu'); // Usamos 'main-options-menu' como ejemplo de menuId
  }
}