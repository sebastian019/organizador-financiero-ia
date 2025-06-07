import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ProfilePopoverComponent implements OnInit {
  username: string | null = '';
  email: string | null = '';

  constructor(
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController 
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.email = this.authService.getEmail();
  }

  async confirmDeleteProfile() {
    const alert = await this.alertController.create({
    header: 'Confirmación',
    message: '¿Estás seguro de que quieres borrar tu perfil? Esta acción es irreversible y eliminará todos tus datos.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Sí, borrar',
        cssClass: 'danger',
        handler: () => {
          this.deleteProfile();
        },
      },
    ],
   });

    await alert.present();
  }

  deleteProfile() {
    this.popoverCtrl.dismiss();
    this.authService.deleteProfile().subscribe({
      next: () => {
        // La lógica de logout y redirección ya está en el servicio.
        console.log('Perfil borrado exitosamente.');
      },
      error: (err) => {
        console.error('Error al borrar el perfil', err);
        // Opcional: Mostrar un toast o alerta de error al usuario.
      }
    });
  }




  logout() {
    // Cerramos el popover y llamamos al método de logout
    this.popoverCtrl.dismiss();
    this.authService.logout();
  }
}