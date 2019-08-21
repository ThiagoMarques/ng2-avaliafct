import { Component, OnInit, Input } from '@angular/core';
import { fadeAnimation } from '../shared/animations/fade.animation';
import { navItems, userItems } from '../_nav';

@Component({
 selector: 'app-shell',
 templateUrl: './app-shell.component.html',
 animations: [fadeAnimation]
})
export class AppShellComponent implements OnInit {
 navItems = navItems;
 userItems = userItems;
 navItemsFilter = [];
 baseArray = navItems;

 currentUser = { name: 'Nome', jobTitle: 'Analista' };

 pageShellOptions = {
  navbarBrandFull: {
   src: 'assets/icons/logoSerpro.svg#logoSerpro',
   alt: 'Logo do Serpro'
  },
  navbarBrandMinimizedDefault: {
   src: 'assets/icons/iconSerpro.svg#logoSerpro',
   alt: 'Logo do Serpro'
  }
 };

 constructor() { }

 ngOnInit() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  sessionStorage.setItem('Menu', JSON.stringify(navItems));
  this.navItems = JSON.parse(sessionStorage.getItem('Menu'));
  if (currentUser['ds_perfil'] !== 'ADMINISTRADOR') {
   // this.navItemsFilter.push(this.navItems[0]);
   switch (currentUser['ds_perfil']) {
    case 'COLABORADOR': {
     this.navItems.filter((data) => {
      switch (data.name) {
       case 'Consultas': {
        this.navItemsFilter.push(data);
        break;
       }
       case 'Sobre': {
        this.navItemsFilter.push(data);
        break;
       }
      }
     });
     this.navItems = this.navItemsFilter;
     break;
    }
    case 'LIDER': {
     this.navItemsFilter.push(this.navItems[0]);
     this.navItems.filter((data) => {
      switch (data.name) {
       case 'Base': {
        const array_temp = data.children;
        const new_child = [];
        array_temp.filter((child) => {
         if (child.name === 'Projeto') {
          new_child.push(child);
         }
         if (child.name === 'Tecnologia') {
          new_child.push(child);
         }
        });
        data.children = new_child;
        this.navItemsFilter.push(data);
        break;
       }
       case 'Consultas': {
        this.navItemsFilter.push(data);
        break;
       }
       case 'Sobre': {
        this.navItemsFilter.push(data);
        break;
       }
      }
     });
     this.navItems = this.navItemsFilter;
     break;
    }
   }
  } else {
   this.navItems = this.baseArray;
  }
  this.currentUser = { name: currentUser['login'], jobTitle: currentUser['ds_perfil'] };
 }

 public getRouterOutletState(outlet) {
  return outlet.isActivated ? outlet.activatedRoute : '';
 }
}
