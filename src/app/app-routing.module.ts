import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'menu-principal',
    loadChildren: () => import('./pages/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },
  {
    path: 'inversiones',
    loadChildren: () => import('./pages/inversiones/inversiones.module').then( m => m.InversionesPageModule)
  },
  {
    path: 'consulta-gpt',
    loadChildren: () => import('./pages/consulta-gpt/consulta-gpt.module').then( m => m.ConsultaGptPageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'opciones',
    loadChildren: () => import('./pages/opciones/opciones.module').then( m => m.OpcionesPageModule)
  },
  {
    path: 'lista-gastos',
    loadChildren: () => import('./pages/lista-gastos/lista-gastos.module').then( m => m.ListaGastosPageModule)
  },
  {
    path: 'familia',
    loadChildren: () => import('./pages/familia/familia.module').then( m => m.FamiliaPageModule)
  },
  {
    path: 'invertir',
    loadChildren: () => import('./pages/invertir/invertir.module').then( m => m.InvertirPageModule)
  }



  /*{
    path: 'login',
    loadChildren: () => import('./pages/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },*/


 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
