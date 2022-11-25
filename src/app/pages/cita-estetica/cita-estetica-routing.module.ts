import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitaEsteticaPage } from './cita-estetica.page';

const routes: Routes = [
  {
    path: '',
    component: CitaEsteticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitaEsteticaPageRoutingModule {}
