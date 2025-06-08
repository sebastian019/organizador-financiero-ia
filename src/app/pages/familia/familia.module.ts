import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FamiliaPageRoutingModule } from './familia-routing.module';
import { FamiliaPage } from './familia.page';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamiliaPageRoutingModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  declarations: [FamiliaPage]
})
export class FamiliaPageModule {}
