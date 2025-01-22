// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './modules/menu/menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./modules/register-professor/register-professor.module').then((m) => m.RegisterProfessorModule),
  },
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'cadastro-prova',
        loadChildren: () =>
          import('./modules/cadastro-prova/cadastro-prova.module').then((m) => m.CadastroProvaModule),
      },
      {
        path: 'mestre-acao',
        loadChildren: () =>
          import('./modules/mestre-acao/mestre-acao.module').then((m) => m.MestreAcaoModule),
      }
    ],
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
