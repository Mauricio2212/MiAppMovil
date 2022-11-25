import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotasUsuarioPage } from './mascotas-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: MascotasUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotasUsuarioPageRoutingModule {}
