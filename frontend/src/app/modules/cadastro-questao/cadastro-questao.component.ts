import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-questao',
  templateUrl: './cadastro-questao.component.html',
  styleUrl: './cadastro-questao.component.css'
})
export class CadastroQuestaoComponent {

  constructor(
    private route: Router,
  ) { }

  onClickAbrirModalNovaQuestao() {
    console.log('abrir modal');
  }

  onClickVoltar() {
    this.route.navigate(['home']);
  }
}
