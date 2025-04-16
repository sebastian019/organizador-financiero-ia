import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {
  nombre: string = '';
  email: string = '';
  contrasenia: string = '';

  mensaje: string = '';
  mensajeVisible:boolean = false;

  constructor(private toastController:ToastController) { }

  ngOnInit() {}

  async mostrarMensaje() {
    const toast = await this.toastController.create({
      message: '!Hola Mundo!',
      duration: 2000,  // El toast dura 2 segundos
      position: 'top'  // Puedes cambiarlo a 'bottom' o 'middle'
    });
    toast.present();  // Muestra el toast
  }
  
  registrarUsuario() {
    console.log('Nombre:', this.nombre);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.contrasenia);
    this.mostrarMensaje();  // Opcional: Muestra el mensaje con el toast
  }
  
}
