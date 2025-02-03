import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService, PoNotificationService, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { InformationUserService } from 'src/app/services/informationUser.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  @Input() title: string = '';

  notificationActions: Array<PoToolbarAction> = [
    {
      icon: 'ph ph-newspaper',
      label: 'Que tal ver as novidades?',
      type: 'danger',
      action: (item: PoToolbarAction) => this.onClickNotification(item)
    },
    { icon: 'ph ph-chat', label: 'Nova mensagem', type: 'danger', action: (item: PoToolbarAction) => this.openDialog(item) }
  ];

  profile: PoToolbarProfile = {
    avatar: 'https://via.placeholder.com/48x48?text=AVATAR',
    subtitle: '',
    title: ''
  };

  profileActions: Array<PoToolbarAction> = [
    { icon: 'ph ph-user', label: 'Meus perfil', action: () => this.goToProfile() },
    { icon: 'ph ph-building-apartment', label: 'Dados da empresa', action: (item: PoToolbarAction) => this.showAction(item) },
    { icon: 'ph ph-gear', label: 'Configurações', action: (item: PoToolbarAction) => this.showAction(item) },
    { icon: 'ph ph-sign-out', label: 'Sair', type: 'danger', separator: true, action: () => this.goToLogin() }
  ];

  constructor(
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService,
    private userService: InformationUserService,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    const userInfo = this.userService.getUserInfo();
    if (userInfo) {
      this.profile = {
        avatar: userInfo.image ? userInfo.image : 'https://via.placeholder.com/48x48?text=AVATAR',
        title: `${userInfo.name} ${userInfo.lastName}`,
        subtitle: userInfo.email
      };
    }
  }
    

  getNotificationNumber() {
    return this.notificationActions.filter(not => not.type === 'danger').length;
  }

  onClickNotification(item: PoToolbarAction) {
    window.open('https://www.google.com.br', '_blank');
    item.type = 'default';
  }

  openDialog(item: PoToolbarAction) {
    this.poDialog.alert({
      title: 'SARA ARAUJO DOS REIS - 2° ANO B',
      message: `Professor, preciso falar com você hoje à noite na sala, me procure!`,
      ok: undefined
    });
    item.type = 'default';
  }

  showAction(item: PoToolbarAction): void {
    this.poNotification.success(`Ação: ${item.label}`);
  }

  goToProfile(): void {
    this.router.navigate(['/perfil']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  
}
