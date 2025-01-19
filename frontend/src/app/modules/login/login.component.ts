import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from './login.service';
import { PoModalPasswordRecoveryType, PoPageLoginLiterals, PoPageLoginRecovery } from '@po-ui/ng-templates';
import { PoLanguage, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { InformationUserService } from '../../services/informationUser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  customLiterals: PoPageLoginLiterals = {
    welcome: 'Seja bem-vindo(a)',
    submitLabel: 'Entrar',
    loginPlaceholder: 'Insira o seu usuário',
    registerUrl: 'Cadastrar-se'
  };

  linguagensPermitidas: Array<PoLanguage> = [];

  passwordRecovery: PoPageLoginRecovery = {
    url: 'https://po-sample-api.onrender.com/v1/users',
    type: PoModalPasswordRecoveryType.All,
    contactMail: 'support@mail.com'
  };

  constructor(
    private loginService: LoginService,
    private informationUserService: InformationUserService,
    private poNotification: PoNotificationService,
    private router: Router
  ) { }


  onLoginSubmit(event : any) {
    console.log(event)
    this.router.navigate(['/home']);
  }

}

