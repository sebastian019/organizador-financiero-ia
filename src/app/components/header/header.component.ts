import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = 'GEPETE ECONOMICS';
  
  isUserLoggedIn: boolean = false;
  userInitials: string | null = '';

  private authSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    public authService: AuthService,
    private popoverCtrl: PopoverController,
    private zone: NgZone 
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.zone.run(() => {
        this.isUserLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.userInitials = this.authService.getUserInitials();
        } else {
          this.userInitials = '';
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }



  async presentPopover(e: Event) {
    const popover = await this.popoverCtrl.create({
      component: ProfilePopoverComponent,
      event: e,
      translucent: true,
      dismissOnSelect: false,
    });
    await popover.present();
  }
}