import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarServiciosPageRoutingModule } from './registrar-servicios-routing.module';

import { RegistrarServiciosPage } from './registrar-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarServiciosPageRoutingModule
  ],
  declarations: [RegistrarServiciosPage]
})
export class RegistrarServiciosPageModule {}
