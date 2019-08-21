import { Component, OnInit } from '@angular/core';
import { ThemeSelectorService } from '@serpro-design/angular';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  themes = ['alto-contraste' /* , 'neoid' */];

  selectedTheme;

  constructor(private themeSelector: ThemeSelectorService) {
    // this.themeSelector.getCurrentTheme()
  }

  ngOnInit() {}

  onSelectTheme(newTheme) {
    if (this.themeSelector.themeManager.THEMES.has(newTheme)) {
      this.themeSelector.setCurrentTheme(newTheme);
    } else {
      this.themeSelector.removeCurrentThemes();
    }
  }
}
