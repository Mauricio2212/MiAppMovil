import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'main1',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  //Implementamos una ruta por defecto
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'main1'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./pages/sing-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./pages/tab1/tab1.module').then( m => m.Tab1PageModule),
    //canActivate: [AuthGuard],
  },
  {
    path: 'tab4',
    loadChildren: () => import('./pages/tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'registrar-mascota',
    loadChildren: () => import('./pages/registrar-mascota/registrar-mascota.module').then( m => m.RegistrarMascotaPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./pages/sucursales/sucursales.module').then( m => m.SucursalesPageModule)
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then( m => m.ResumenPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./pages/mascotas/mascotas.module').then( m => m.MascotasPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'promotions',
    loadChildren: () => import('./pages/promotions/promotions.module').then( m => m.PromotionsPageModule)
  },
  {
    path: 'mascotas-usuario',
    loadChildren: () => import('./pages/mascotas-usuario/mascotas-usuario.module').then( m => m.MascotasUsuarioPageModule)
  },
  {
    path: 'registro-sucursales',
    loadChildren: () => import('./pages/registro-sucursales/registro-sucursales.module').then( m => m.RegistroSucursalesPageModule)
  },
  {
    path: 'cita',
    loadChildren: () => import('./pages/cita/cita.module').then( m => m.CitaPageModule)
  },
  {
    path: 'horarios',
    loadChildren: () => import('./pages/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'registrar-servicios',
    loadChildren: () => import('./pages/registrar-servicios/registrar-servicios.module').then( m => m.RegistrarServiciosPageModule)
  },
  {
    path: 'cita-estetica',
    loadChildren: () => import('./pages/cita-estetica/cita-estetica.module').then( m => m.CitaEsteticaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
