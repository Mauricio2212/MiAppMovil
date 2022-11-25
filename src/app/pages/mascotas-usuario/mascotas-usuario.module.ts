import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotasUsuarioPageRoutingModule } from './mascotas-usuario-routing.module';

import { MascotasUsuarioPage } from './mascotas-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascotasUsuarioPageRoutingModule
  ],
  declarations: [MascotasUsuarioPage]
})
export class MascotasUsuarioPageModule {}
