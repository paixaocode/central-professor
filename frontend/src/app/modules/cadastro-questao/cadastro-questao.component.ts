import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { CadastroQuestaoService } from './cadastro-questao.service';
import { FormGerarQuestaoService } from './form-gerar-questao/form-gerar-questao.service';

@Component({
  selector: 'app-cadastro-questao',
  templateUrl: './cadastro-questao.component.html',
  styleUrl: './cadastro-questao.component.css'
})
export class CadastroQuestaoComponent implements OnInit {

  @ViewChild('modalNovaQuestao') modalNovaQuestao!: PoModalComponent;
  @ViewChild('modalExcluirQuestao', { static: false }) modalExcluirQuestao!: PoModalComponent;

  public isFormValid: boolean = false;
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

  confirmarNovaQuestao: PoModalAction = {
    action: () => {
      this.processCriarNovaQuestao();
    },
    label: 'Confirmar',
    loading: false,
    disabled: true
  };

  constructor(
    private cadastroQuestaoService: CadastroQuestaoService,
    private formGerarQuestaoService: FormGerarQuestaoService,
    private poNotification: PoNotificationService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.init();
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

  private _closeModalCriarNovaQuestao() {
    this.modalNovaQuestao.close();
  }

  private onEditarQuestao(questao: any) {
    console.log('Editar Questão: ', questao);
  }

  private onExcluirQuestao(questao: any) {
    this.modalExcluirQuestao.open();
  }

  private resetarFormulario() {
    this.formGerarQuestaoService.resetFormData();
  }

  private atualizarEstadoBotaoLoadingModal(): void {
    const isFormValid = this.isFormValid;
    this.confirmarNovaQuestao.disabled = !isFormValid;
  }

  private processCriarNovaQuestao() {
    let formData;

    formData = this.formGerarQuestaoService.getFormData();
    

    if (formData) {
      this.route.navigate(['/cadastro-questao/incluir'], {
        state: {
          formData: formData
        }
      });
    } else {
      this.poNotification.error('Houve um erro ao criar a questao. Por favor, tente novamente.');
      this._closeModalCriarNovaQuestao();
      this.atualizarEstadoBotaoLoadingModal();
    }
  }
}
