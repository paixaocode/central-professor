import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-professor',
  templateUrl: './register-professor.component.html',
  styleUrls: ['./register-professor.component.css']
})
export class RegisterProfessorComponent {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      sobrenome: ['', Validators.required],
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

  public saveRegister() {
    if (this.registerForm.valid) {
      this.router.navigate(['/login']);
    } else {
      console.log('pau no form')
    }
  }

  public cancelRegister() { 
    this.router.navigate(['/login']);
  }
}
