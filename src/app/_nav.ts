import { NavItem } from '@serpro-design/angular/lib/shared/nav-item';

// Sobre _nav.ts
// Neste arquivo você pode configurar
// - os itens do menu principal (navItems)
// - os itens do menu do usuário (userItems)
//
// Sobre os ícones, temos os seguintes ícones:
//
// - fontawesome-free(5.x): https://fontawesome.com/icons?d=gallery&m=free
//   Exemplo de uso: "fa fa-list"
//
// - @coreui/icons(0.3.0): https://coreui.io/icons/
//   Exemplo de uso: "cui-note"
//

/**
 * Itens para o menu de navegação da aplicação.
 */
export const navItems: NavItem[] = [
  {
    title: true,
    name: 'Avaliação FCT'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cui-speedometer'
  },
  {
    name: 'Avaliar',
    url: '/avaliacao',
    icon: 'cui-task',
  },

  {
    name: 'Base',
    url: '/cadastro-base',
    icon: 'cui-task',
    children: [
      {
        name: 'Abrangência',
        url: '/cadastro-base/abrangencia',
        icon: ' '
      },
      {
        name: 'Atributo',
        url: '/cadastro-base/atributo',
        icon: ' '
      },
      {
        name: 'Colaborador',
        url: '/cadastro-base/colaborador',
        icon: ' '
      },
      {
        name: 'Complexidade',
        url: '/cadastro-base/complexidade',
        icon: ' '
      },
      {
        name: 'Divisão',
        url: '/cadastro-base/divisao',
        icon: ' '
      },
      {
        name: 'Impacto',
        url: '/cadastro-base/impacto',
        icon: ' '
      },
      {
        name: 'Papel',
        url: '/cadastro-base/papel',
        icon: ' '
      },
      {
        name: 'Pesos',
        url: '/cadastro-base/pesos',
        icon: ' '
      },
      {
        name: 'Projeto',
        url: '/cadastro-base/projeto',
        icon: ' '
      },
      {
        name: 'Referência FCT',
        url: '/cadastro-base/referencia',
        icon: ' '
      },
      {
        name: 'Tecnologia',
        url: '/cadastro-base/tecnologia',
        icon: ' '
      }
    ]
  },
  {
    name: 'Avançado',
    url: '/cadastro-avancado',
    icon: 'cui-task',
    children: [
      {
        name: 'Valor',
        url: '/cadastro-avancado/distribuicao',
        icon: ' '
      },
      {
        name: 'Faixas',
        url: '/cadastro-avancado/faixas',
        icon: ' '
      }
    ]
  },
  {
    name: 'Consultas',
    url: '/consultas',
    icon: 'cui-task'
  },
  {
    name: 'Sobre',
    url: '/sobre',
    icon: 'fa fa-question'
  },
];

/**
 * Itens para o menu dropdown do menu superior direito.
 */
export const userItems = [
  {
    title: true,
    name: 'Configurações'
  },
  // {
  //   name: 'Perfil',
  //   icon: 'fa fa-user',
  //   url: '/user/profile'
  // },
  {
    name: 'Preferências',
    icon: 'fa fa-wrench',
    url: '/user/settings'
  },
  {
    name: 'Trocar senha',
    icon: 'fa fa-key',
    url: '/trocar-senha'
  },
  { divider: true },
  {
    name: 'Sair',
    icon: 'fa fa-lock',
    url: '/logout'
  }
];
