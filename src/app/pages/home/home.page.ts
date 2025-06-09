import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false 
})
export class HomePage {
  constructor(
    private router: Router,
    private menuCtrl: MenuController 
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-options-menu');
    this.menuCtrl.swipeGesture(false, 'main-options-menu');
  }

  iniciarSesion() {
    this.router.navigate(['/sign-in']);
  }

  registrarse() {
    this.router.navigate(['/register']);
  }
}