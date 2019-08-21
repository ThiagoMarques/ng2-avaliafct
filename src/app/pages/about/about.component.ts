import { Component, OnInit } from '@angular/core';

export interface Arquivos {
  nome: string;
  obrigatorio: string;
  descricao: string;
  versao: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  arquivos: Arquivos[];

  constructor() { }

  ngOnInit() {
    this.arquivos = [
      {
        nome: 'app-shell',
        obrigatorio: 'Sim',
        descricao: 'Componente que monta toda a tela incluindo header, menu-aside e footer.',
        versao: '3.0.0'
      },
      {
        nome: 'auth',
        obrigatorio: 'Não',
        descricao: 'Componente que contém todo o fluxo de autenticação do usuário.',
        versao: '3.0.0'
      },
      {
        nome: 'dashboard',
        obrigatorio: 'Não',
        descricao: 'Componente responsável por listar vários estilos de gráficos.',
        versao: '3.0.0'
      },
      {
        nome: 'feature',
        obrigatorio: 'Não',
        descricao: 'Componentes responsáveis por implementação de caracteristicas dos produtos.',
        versao: '3.0.0'
      },
      {
        nome: 'pages',
        obrigatorio: 'Sim',
        descricao: 'Componentes responsáveis por implementação de páginas dos produtos.',
        versao: '3.0.0'
      },
      {
        nome: 'shared',
        obrigatorio: 'Não',
        descricao: 'Compontes e outros artefatos que serão compartilhados com toda a aplicação.',
        versao: '3.0.0'
      },
      {
        nome: 'user',
        obrigatorio: 'Não',
        descricao: 'Componente que contém todo o fluxo de configuração de profiles e settings da aplicação.',
        versao: '3.0.0'
      },
      {
        nome: '_nav.ts',
        obrigatorio: 'Sim',
        descricao: 'Arquivo que guarda toda a configuração no side-menu do Quick Start.',
        versao: '3.0.0'
      }
    ];
  }

}
