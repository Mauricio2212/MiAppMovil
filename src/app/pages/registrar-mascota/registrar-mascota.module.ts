import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarMascotaPageRoutingModule } from './registrar-mascota-routing.module';

import { RegistrarMascotaPage } from './registrar-mascota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarMascotaPageRoutingModule
  ],
  declarations: [RegistrarMascotaPage]
})
export class RegistrarMascotaPageModule {}
