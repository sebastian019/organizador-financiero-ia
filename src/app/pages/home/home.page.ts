import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})


export class HomePage {
    constructor(private navCtrl: NavController) {}
  
    iniciarSesion() {
      // Lógica para iniciar sesión
    }
  
    registrarse() {
      //this.navCtrl.navigateForward('/register'); Lógica para registrarse
    }
}
