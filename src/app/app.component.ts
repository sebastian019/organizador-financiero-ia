// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { MenuController, Platform, IonicModule } from '@ionic/angular'; // Importa IonicModule
import { CommonModule } from '@angular/common'; // Importa CommonModule si usas *ngIf, etc.
// Importa HeaderComponent si lo usas directamente en app.component.html
// (Aunque en el último enfoque, HeaderComponent se usa dentro de las páginas del router-outlet)

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  //standalone: true, // ¡CLAVE!
  imports: [
    IonicModule,      // Para todos los componentes ion-*
    CommonModule,     // Para directivas como *ngIf, *ngFor
    RouterModule,      // Para <ion-router-outlet> y directivas de enrutamiento
    // HeaderComponent // Solo si <app-header> estuviera directamente en app.component.html
                      // y no dentro de las páginas que carga el router-outlet.
  ]
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/menu-principal', icon: 'home' },
    { title: 'Opciones', url: '/opciones', icon: 'settings' }
  ];

  constructor(
    private platform: Platform,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.loadTheme(); 
  }

  loadTheme() {
    const backgroundColor = localStorage.getItem('theme-background');
    const headerColor = localStorage.getItem('theme-header');
    
    // **** AÑADIR ESTA LÍNEA ****
    const themeMode = localStorage.getItem('theme-mode');

    if (backgroundColor) {
      document.documentElement.style.setProperty('--ion-background-color', backgroundColor);
    }
    if (headerColor) {
      document.documentElement.style.setProperty('--ion-color-primary', headerColor);
    }

    // **** AÑADIR ESTA LÓGICA ****
    if (themeMode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // ...
    });
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
    this.menuCtrl.close('mainOptionsMenu');
  }

  // ... (tu método logout si lo tienes)
}