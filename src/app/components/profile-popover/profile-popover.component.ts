import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController } from '@ionic/angular';
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
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.email = this.authService.getEmail();
  }

  editProfile() {
    // Cerramos el popover y navegamos a la página de perfil
    this.popoverCtrl.dismiss();
    this.router.navigate(['/profile']);
  }

  logout() {
    // Cerramos el popover y llamamos al método de logout
    this.popoverCtrl.dismiss();
    this.authService.logout();
  }
}