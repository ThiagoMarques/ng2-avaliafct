import { Component, OnInit } from '@angular/core';
import { TitleUpdaterService, ThemeSelectorService } from '@serpro-design/angular';
import { LoginService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<sd-loading-center></sd-loading-center> <router-outlet class="app-component-router"></router-outlet>'
})
export class AppComponent {

  constructor(private titleUpdater: TitleUpdaterService, private themeSelector: ThemeSelectorService, private authservice: LoginService) {

    // Inicializa um observable para atualização do título da página com base em cada rota.
    this.titleUpdater.observeRoutes({
      prefix: 'Serpro Design',
      force: true
    });

    // Informe os temas disponíveis na aplicação
    themeSelector.themeManager.addTheme('alto-contraste', ['/assets/themes/alto-contraste.css']);
  }

}
