import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { InformationUserService } from 'src/app/services/informationUser.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Array<PoMenuItem> = [];
  userName: string = '';

  constructor(private userService: InformationUserService) {}

  ngOnInit(): void {
    this.menus = [
      { label: 'Home', link: '/home', shortLabel: 'Home', icon: 'ph ph-house-line' },
      { 
        label: 'Cadastros', 
        icon: 'ph ph-clipboard', 
        subItems: [
          { label: 'Cadastro de Questões', link: '/cadastro-questao', shortLabel: 'Cad. Questão', icon: 'ph ph-list-plus' },
          { label: 'Cadastro de Provas', link: '/cadastro-prova', shortLabel: 'Cad. Prova', icon: 'ph ph-clipboard-text' }
        ]
      },
      { label: 'Mestre em Ação', link: "/mestre-acao", shortLabel: "Mestre", icon: "ph ph-chalkboard-teacher" },
      { label: 'Sair', link: '/login', shortLabel: 'Sair', icon: 'ph ph-sign-out' }
    ];

    const userInfo = this.userService.getUserInfo();
    if (userInfo && userInfo.name) {
      this.userName = this.capitalizeName(userInfo.name);
    }
  }

  capitalizeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
