import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@serpro-design/angular';
import { AppShellComponent } from './app-shell/app-shell.component';
import { LoggedInLazyLoadGuard } from './auth/logged-in-lazy-load.guard';
import { Perfil } from './auth/models/perfil';
import { AboutComponent } from './pages/about/about.component';
import { ExemploNgrxFormsComponent } from './pages/exemplo-ngrx-forms/exemplo-ngrx-forms.component';
import { ExemploStoreComponent } from './pages/exemplo-store/exemplo-store.component';

const routes: Routes = [
  {
    // NOTA: configure a rota padrão da aplicação.
    // No exemplo abaixo, quando nenhuma rota for informada, o app irá redirecionar para a rota 'about'
    path: '',
    redirectTo: 'consultas',
    pathMatch: 'full'
  },

  // Rotas de Autenticação (assíncronas)
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginModule'
  },
  {
    path: 'logout',
    loadChildren: './auth/logout/logout.module#LogoutModule'
  },
  // {
  //   path: 'recuperar-senha',
  //   loadChildren:
  //     './auth/recuperar-senha/recuperar-senha.module#RecuperarSenhaModule'
  // },
  {
    path: 'criar-uma-conta',
    loadChildren:
      './auth/criar-uma-conta/criar-uma-conta.module#CriarUmaContaModule'
  },
  {
    path: 'trocar-senha',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadChildren: './auth/trocar-senha/trocar-senha.module#TrocarSenhaModule'
      }
    ]
  },
  {
    path: 'trocar-senha',
    loadChildren:
      './auth/trocar-senha/trocar-senha.module#TrocarSenhaModule'
  },

  // Rotas de Dashboard
  {
    path: 'dashboard',
    component: AppShellComponent,
    data: {
      title: 'Dashboard',
      breadcrumb: 'dashboard',
      roles: [Perfil.Administrador]
    },
    canActivate: [LoggedInLazyLoadGuard],
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      }
    ]
  },
  {
    path: 'avaliacao',
    component: AppShellComponent,
    data: {
      roles: [Perfil.Administrador, Perfil.Lider]
    },
    canActivate: [LoggedInLazyLoadGuard],
    children: [
      {
        path: '',
        loadChildren: './avaliacao/avaliacao.module#AvaliacaoModule'
      }
    ]
  },
  {
    path: 'cadastro-base',
    component: AppShellComponent,
    data: {
      roles: [Perfil.Administrador, Perfil.Lider]
    },
    canActivate: [LoggedInLazyLoadGuard],
    children: [
      {
        path: '',
        loadChildren: './cadastro-base/cadastro-base.module#CadastroBaseModule'
      }
    ]
  },
  {
    path: 'cadastro-avancado',
    component: AppShellComponent,
    data: {
      roles: [Perfil.Administrador]
    },
    canActivate: [LoggedInLazyLoadGuard],
    children: [
      {
        path: '',
        loadChildren: './cadastro-avancado/cadastro-avancado.module#CadastroAvancadoModule'
      }
    ]
  },
  {
    path: 'consultas',
    component: AppShellComponent,
    canActivate: [LoggedInLazyLoadGuard],
    children: [
      {
        path: '',
        loadChildren: './consultaavaliacao/consultaavaliacao.module#ConsultaAvaliacaoModule'
      }
    ]
  },
  {
    path: 'sobre',
    component: AppShellComponent,
    canActivate: [LoggedInLazyLoadGuard],
    children: [
      {
        path: '',
        loadChildren: './sobre/sobre.module#SobreModule'
      }
    ]
  },


  // // Rotas do Usuário
  {
    path: 'user',
    component: AppShellComponent,
    canActivate: [LoggedInLazyLoadGuard],
    children: [
      {
        path: '',
        loadChildren: './user/user.module#UserModule'
      }
    ]
  },

  // // Outras rotas "genéricas" possíveis
  // {
  //   path: 'about',
  //   component: AppShellComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: AboutComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'exemplo-ngrx-store',
  //   component: AppShellComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: ExemploStoreComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'exemplo-ngrx-forms',
  //   component: AppShellComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: ExemploNgrxFormsComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'exemplo-ngx-formly',
  //   component: AppShellComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './pages/exemplo-ngx-formly/exemplo-ngx-formly.module#ExemploNgxFormlyModule'
  //     }
  //   ]
  // },

  // Caso não encontre a rota, mostre o componente de "página não encontrada" do Serpro Design.
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
