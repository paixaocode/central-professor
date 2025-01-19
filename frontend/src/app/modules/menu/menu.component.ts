import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems: Array<PoMenuItem> = []
  saudacao: string = ''
  nameUser: string = ''
  isAdmin: boolean = false;

  constructor() {
    
  }

  ngOnInit(): void {
  }

  readonly menus: Array<PoMenuItem> = [

    { label: 'Home', link: "home", shortLabel: "Home", icon: "   ph ph-house-line" },
    { label: 'Cadastro de Provas', link: "cadastro-prova", shortLabel: "Cad. Prova", icon: "ph ph-clipboard-text" },
    { label: 'Sair', link: '/', shortLabel: 'Sair', icon: 'ph ph-sign-out' }
    
  ];
}
