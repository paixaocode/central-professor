import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { PoModalPasswordRecoveryType, PoPageLoginLiterals, PoPageLoginRecovery } from '@po-ui/ng-templates';
import { PoLanguage, PoNotificationService } from '@po-ui/ng-components';
import { InformationUserService } from '../../services/informationUser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  customLiterals: PoPageLoginLiterals = {
    welcome: 'Seja bem-vindo(a)',
    submitLabel: 'Entrar',
    loginPlaceholder: 'Insira o seu e-mail',
    registerUrl: 'Cadastrar-se',
  };

  linguagensPermitidas: Array<PoLanguage> = [];

  passwordRecovery: PoPageLoginRecovery = {
    url: 'https://po-sample-api.onrender.com/v1/users',
    type: PoModalPasswordRecoveryType.All,
    contactMail: 'support@mail.com',
  };

  constructor(
    private loginService: LoginService,
    private poNotification: PoNotificationService,
    private router: Router,
    private informationUserService: InformationUserService
  ) {}

  onLoginSubmit(event: any) {
    const { login, password } = event;
  
    const data = {
      email: login,
      password: password,
    };
  
    this.loginService.login(data).subscribe({
      next: (response) => {
        const { user, token } = response;
  
        localStorage.setItem('authToken', token);
  
        this.informationUserService.setUserInfo({
          id: user._id,
          role: user.personalInfo.role,
          name: user.personalInfo.name,
          lastName: user.personalInfo.lastName,
          phone: user.personalInfo.phone,
          email: user.personalInfo.email,
          image: user.personalInfo.image,
          token: token,
        });
  
        this.poNotification.success('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        const errorMessage =
          err.error?.message || 'Erro ao realizar login. Verifique suas credenciais.';
        this.poNotification.error(errorMessage);
      },
    });
  }
  
}
