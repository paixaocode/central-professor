import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menus: Array<PoMenuItem> = [];

  constructor() {}

  ngOnInit(): void {
    this.menus = [
      { label: 'Home', link: '/home', shortLabel: 'Home', icon: 'ph ph-house-line' },
      { label: 'Cadastro de Provas', link: '/cadastro-prova', shortLabel: 'Cad. Prova', icon: 'ph ph-clipboard-text' },
      { label: 'Sair', link: '/login', shortLabel: 'Sair', icon: 'ph ph-sign-out' },
    ];
  }
}
