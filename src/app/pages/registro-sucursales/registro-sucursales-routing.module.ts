import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroSucursalesPage } from './registro-sucursales.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroSucursalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroSucursalesPageRoutingModule {}
