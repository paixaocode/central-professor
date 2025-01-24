import { Component, Input } from '@angular/core';
import { PoDialogService, PoNotificationService, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

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
    subtitle: 'professor@fiap.com.br',
    title: 'Gabriel Paixão'
  };

  profileActions: Array<PoToolbarAction> = [
    { icon: 'ph ph-user', label: 'Meus dados', action: (item: PoToolbarAction) => this.showAction(item) },
    { icon: 'ph ph-building-apartment', label: 'Dados da empresa', action: (item: PoToolbarAction) => this.showAction(item) },
    { icon: 'ph ph-gear', label: 'Configurações', action: (item: PoToolbarAction) => this.showAction(item) },
    { icon: 'ph ph-sign-out', label: 'Sair', type: 'danger', separator: true, action: (item: PoToolbarAction) => this.showAction(item) }
  ];

  constructor(
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService
  ) {}

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
      message: `Professor, preciso falar com você hoje a noite na sala, me procure!`,
      ok: undefined
    });
    item.type = 'default';
  }

  showAction(item: PoToolbarAction): void {
    this.poNotification.success(`ação: ${item.label}`);
  }
}

