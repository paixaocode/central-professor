import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoModalComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { CadastroQuestaoService } from './cadastro-questao.service';

@Component({
  selector: 'app-cadastro-questao',
  templateUrl: './cadastro-questao.component.html',
  styleUrl: './cadastro-questao.component.css'
})
export class CadastroQuestaoComponent implements OnInit {

  @ViewChild('modalExcluirQuestao', { static: false }) modalExcluirQuestao!: PoModalComponent;

  public colunasTabelaCadastroQuestao: Array<PoTableColumn> = [];
  public itemsCadastroQuestao: Array<any> = [];
  public acoesTabelaCadastroQuestao: Array<PoTableAction> = [
    {
      action: this.onEditarQuestao.bind(this),
      icon: 'ph ph-pencil-simple',
      label: 'Editar',
    },
    {
      action: this.onExcluirQuestao.bind(this),
      icon: 'ph ph-trash',
      label: 'Excluir',
    }
  ];

  constructor(
    private cadastroQuestaoService: CadastroQuestaoService,
    private route: Router,
  ) { }
  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.colunasTabelaCadastroQuestao = this.cadastroQuestaoService.getColunasCadastroQuestao();
  }

  onClickAbrirModalNovaQuestao() {
    console.log('abrir modal');
  }

  onClickVoltar() {
    this.route.navigate(['home']);
  }

  private onEditarQuestao(questao: any) {
    console.log('Editar Questão: ', questao);
  }

  private onExcluirQuestao(questao: any) {
    this.modalExcluirQuestao.open();
  }
}
