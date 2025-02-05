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
    path: 'ops',
    loadChildren: () =>
      import('./modules/ops/ops.module').then((m) => m.OpsModule),
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
        path: 'cadastro-questao',
        loadChildren: () =>
          import('./modules/cadastro-questao/cadastro-questao.module').then((m) => m.CadastroQuestaoModule),
      },
      {
        path: 'mestre-acao',
        loadChildren: () =>
          import('./modules/mestre-acao/mestre-acao.module').then((m) => m.MestreAcaoModule),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('./modules/perfil/perfil.module').then((m) => m.PerfilModule),
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
