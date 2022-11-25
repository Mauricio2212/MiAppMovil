import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitaEsteticaPageRoutingModule } from './cita-estetica-routing.module';

import { CitaEsteticaPage } from './cita-estetica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitaEsteticaPageRoutingModule
  ],
  declarations: [CitaEsteticaPage]
})
export class CitaEsteticaPageModule {}
