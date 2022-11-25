import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarMascotaPage } from './registrar-mascota.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarMascotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarMascotaPageRoutingModule {}
