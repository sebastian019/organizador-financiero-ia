import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { MenuController, Platform, IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonicModule,      
    CommonModule,     
    RouterModule,      
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
    
    const themeMode = localStorage.getItem('theme-mode');

    if (backgroundColor) {
      document.documentElement.style.setProperty('--ion-background-color', backgroundColor);
    }
    if (headerColor) {
      document.documentElement.style.setProperty('--ion-color-primary', headerColor);
    }

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

}