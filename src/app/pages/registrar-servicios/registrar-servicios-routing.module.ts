import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarServiciosPage } from './registrar-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarServiciosPageRoutingModule {}
