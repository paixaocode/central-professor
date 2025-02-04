import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { CadastroQuestaoService } from './cadastro-questao.service';
import { FormGerarQuestaoService } from './form-gerar-questao/form-gerar-questao.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CadastroQuestao, QuestaoObj } from './cadastro-questao.models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cadastro-questao',
  templateUrl: './cadastro-questao.component.html',
  styleUrl: './cadastro-questao.component.css'
})
export class CadastroQuestaoComponent implements OnInit {

  @ViewChild('modalNovaQuestao') modalNovaQuestao!: PoModalComponent;
  @ViewChild('modalExcluirQuestao', { static: false }) modalExcluirQuestao!: PoModalComponent;

  questaoId: string | null = null;

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
    private formGerarQuestaoService: FormGerarQuestaoService,
    private poNotification: PoNotificationService,
    private destroyRef: DestroyRef,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.init();
    this.getTodasQuestoes();
  }

  private init() {
    this.colunasTabelaCadastroQuestao = this.cadastroQuestaoService.getColunasCadastroQuestao();
  }

  onClickAbrirModalNovaQuestao() {
    this.resetarFormulario();
    this.modalNovaQuestao.open();
  }

  onClickVoltar() {
    this.route.navigate(['home']);
  }

  closeModalNovaQuestao: PoModalAction = {
    action: () => {
      this._closeModalCriarNovaQuestao();
    },
    label: 'Cancelar',
    danger: true
  };

  closeModalExcluirQuestao: PoModalAction = {
    action: () => {
      this._closeModalExcluirQuestao();
    },
    label: 'Cancelar',
    danger: true
  };

  confirmarExclusaoQuestao: PoModalAction = {
    action: () => {
      this.processExcluirQuestao();
    },
    label: 'Confirmar',
    loading: false,
    disabled: false,
    danger: true
  };

  private getTodasQuestoes(): void {
    this.cadastroQuestaoService.getQuestoesCadastradas(1)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (questoesObj: QuestaoObj) => {
         const questoesList = questoesObj.questions;
         console.log(questoesList);
         this.itemsCadastroQuestao = questoesList;
      },
      error: e => {
        console.error(e);
      }
    })
  }

  private _closeModalCriarNovaQuestao() {
    this.modalNovaQuestao.close();
    this.getTodasQuestoes();
  }

  private _closeModalExcluirQuestao() {
    this.modalExcluirQuestao.close();
  }

  private onEditarQuestao(questao: any) {
    // Melhoria Futura
    console.log('Editar Questão: ', questao);
  }

  private onExcluirQuestao(questao: any) {
    this.questaoId = questao._id;
    this.modalExcluirQuestao.open();
  }

  private processExcluirQuestao() {
    if(!this.questaoId) {
      return
    }
    this.formGerarQuestaoService.deleteQuestion(this.questaoId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.questaoId = null;
          this.closeModalExcluirQuestao.action();
        })
      )
      .subscribe({
        next: () => {
          this.poNotification.success('Questão excluída com sucesso!');
          this.getTodasQuestoes();
         },
        error: (err) => {
          const errorMessage = err.error?.message || 'Erro ao deletar a questão. Por favor, tente novamente mais tarde.';
          this.poNotification.error(errorMessage);
         }
      })
  }

  private resetarFormulario() {
    this.formGerarQuestaoService.resetFormData();
  }
}
