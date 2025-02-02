import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterProfessorService } from './register-professor.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-register-professor',
  templateUrl: './register-professor.component.html',
  styleUrls: ['./register-professor.component.css']
})
export class RegisterProfessorComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterProfessorService,
    private poNotification: PoNotificationService
  ) {
    this.registerForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      sobrenome: ['', [Validators.required, Validators.minLength(3), this.validateOnlyLetters]],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6), this.passwordComplexity]],
      confirmarSenha: ['', [Validators.required, this.matchPasswords]]
    });

    this.registerForm.get('senha')?.valueChanges.subscribe(() => {
      this.updateFormValidity();
    });

    this.registerForm.get('confirmarSenha')?.valueChanges.subscribe(() => {
      this.updateFormValidity();
    });
  }

  private updateFormValidity(): void {
    const senha = this.registerForm.get('senha');
    const confirmarSenha = this.registerForm.get('confirmarSenha');

    if (senha?.value !== confirmarSenha?.value) {
      confirmarSenha?.setErrors({ 'passwordMismatch': true });
    } else {
      confirmarSenha?.setErrors(null);
    }
    this.registerForm.updateValueAndValidity();
  }

  matchPasswords(control: FormControl): { [key: string]: boolean } | null {
    const senha = control.root.get('senha')?.value;
    const confirmarSenha = control.value;
    if (senha !== confirmarSenha) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  passwordComplexity(control: FormControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = hasUpperCase && hasNumber && hasSpecialChar;

    if (!isValid) {
      return { 'passwordComplexity': true };
    }
    return null;
  }

  validateOnlyLetters(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value || '';
    const isValid = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value);
    if (!isValid) {
      return { onlyLetters: true };
    }
    return null;
  }

  public saveRegister() {
    if (this.registerForm.valid) {
      const data = {
        name: this.registerForm.get('nomeCompleto')?.value,
        lastName: this.registerForm.get('sobrenome')?.value,
        birthDate: this.formatDate(this.registerForm.get('dataNascimento')?.value),
        CPF: this.registerForm.get('cpf')?.value,
        phone: this.registerForm.get('telefone')?.value,
        email: this.registerForm.get('email')?.value,
        gender: this.mapGender(this.registerForm.get('genero')?.value),
        password: this.registerForm.get('senha')?.value,
      };

      this.registerService.registerProfessor(data).subscribe({
        next: (response) => {
          this.poNotification.success('Uhuu! Seu cadastro foi realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error?.error?.error) {
            this.poNotification.error(error.error.error);
          } else {
            this.poNotification.error('Ocorreu um erro inesperado. Tente novamente.');
          }
        },
      });
    }
  }

  private formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  private mapGender(value: string): string {
    if (value === '1') return 'male';
    if (value === '2') return 'female';
    return 'male';
  }

  public cancelRegister() {
    this.router.navigate(['/login']);
  }
}
