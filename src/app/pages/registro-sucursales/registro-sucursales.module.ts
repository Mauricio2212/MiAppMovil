import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroSucursalesPageRoutingModule } from './registro-sucursales-routing.module';

import { RegistroSucursalesPage } from './registro-sucursales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroSucursalesPageRoutingModule
  ],
  declarations: [RegistroSucursalesPage]
})
export class RegistroSucursalesPageModule {}
