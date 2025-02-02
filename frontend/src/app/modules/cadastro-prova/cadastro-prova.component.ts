import { Component, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { CadastroProvaService } from './cadastro-prova.service';
import { Router } from '@angular/router';
import { FormGerarProvaManualService } from './form-gerar-prova-manual/form-gerar-prova-manual.service';
import { FormGerarProvaIaService } from './form-gerar-prova-ia/form-gerar-prova-ia.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { FormGerarProvaDinamicaService } from './form-gerar-prova-dinamica/form-gerar-prova-dincamica.service';

@Component({
  selector: 'app-cadastro-prova',
  templateUrl: './cadastro-prova.component.html',
  styleUrls: ['./cadastro-prova.component.css']
})
export class CadastroProvaComponent {

  @ViewChild('modalNovaProva') modalNovaProva!: PoModalComponent;
  @ViewChild('modalExcluirProva', { static: false }) modalExcluirProva!: PoModalComponent;


  public colunasTabelaCadastroProva: Array<PoTableColumn> = [];
  public itemsCadastroProva: Array<any> = [];
  public isGerarProvaIA: boolean = false;

  public isFormManualValid: boolean = false;
  public isFormIAValid: boolean = false;
  public isExibirExcluir: boolean = false;
  public provaSelecionada: any = null;

  confirmarNovaProva: PoModalAction = {
    action: () => {
      this.processCriarNovaProva();
    },
    label: 'Confirmar',
    loading: false,
    disabled: true
  };

  closeModalNovaProva: PoModalAction = {
    action: () => {
      this._closeModalCriarNovaProva();
    },
    label: 'Cancelar',
    danger: true
  };

  confirmarExclusaoProva: PoModalAction = {
    action: () => {
      this.processExcluirProva();
    },
    label: 'Confirmar',
    loading: false,
    disabled: false,
    danger: true
  };

  closeModalExcluirProva: PoModalAction = {
    action: () => {
      this._closeModalExcluirProva();
    },
    label: 'Cancelar',
    danger: true
  };

  public acoesTabelaCadastroProva: Array<PoTableAction> = [
    {
      action: this.onVisualizarProva.bind(this),
      icon: 'ph ph-eye',
      label: 'Visualizar',
    },
    {
      action: this.onEditarProva.bind(this),
      icon: 'ph ph-pencil-simple',
      label: 'Editar',
    },
    {
      action: this.onExcluirProva.bind(this),
      icon: 'ph ph-trash',
      label: 'Excluir',
    }
  ];

  isFormValid: boolean = false;

  public tipoGeracaoProva: string = 'manual';
  public opcoesTipoGeracao: Array<{ label: string; value: string }> = [
    { label: 'Manulmente', value: 'manual' },
    { label: 'Através de IA', value: 'ia' },
    { label: 'Dinâmica', value: 'dinamica' }
  ];

  constructor(
    private cadastroProvaService: CadastroProvaService,
    private route: Router,
    private formProvaManualService: FormGerarProvaManualService,
    private formProvaIaService: FormGerarProvaIaService,
    private formProvaDinamicaService: FormGerarProvaDinamicaService,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.formProvaManualService.formValid$.subscribe(isValid => {
      this.isFormManualValid = isValid;
      this.atualizarEstadoBotaoLoadingModal();
    });

    this.formProvaIaService.formValid$.subscribe(isValid => {
      this.isFormIAValid = isValid;
      this.atualizarEstadoBotaoLoadingModal();
    });

    this.formProvaDinamicaService.formValid$.subscribe(isValid => {
      this.isFormIAValid = isValid;
      this.atualizarEstadoBotaoLoadingModal();
    });


    this.init();
    this.mockDados();
  }

  private init() {
    this.colunasTabelaCadastroProva = this.cadastroProvaService.getColunasCadastroProva();
  }

  private mockDados() {
    this.itemsCadastroProva = [
      { codigoProva: 'P001', nomeProva: 'Prova de Matemática - 1º Semestre', disciplinaProva: 'Matemática', formatoProva: 'Presencial', notaMaximaProva: '10', turmaProva: '1º Ano A', status: 'statusProvaAtiva' },
      { codigoProva: 'P002', nomeProva: 'Prova de Física - 2º Semestre', disciplinaProva: 'Física', formatoProva: 'Presencial', notaMaximaProva: '10', turmaProva: '2º Ano B', status: 'statusProvaEmElaboracao' },
      { codigoProva: 'P003', nomeProva: 'Prova de História - 1º Semestre', disciplinaProva: 'História', formatoProva: 'Presencial', notaMaximaProva: '15', turmaProva: '3º Ano C', status: 'statusProvaAtiva' },
      { codigoProva: 'P004', nomeProva: 'Prova de Geografia - 1º Semestre', disciplinaProva: 'Geografia', formatoProva: 'Online', notaMaximaProva: '10', turmaProva: '1º Ano B', status: 'statusProvaAtiva' },
      { codigoProva: 'P005', nomeProva: 'Prova de Química - 3º Semestre', disciplinaProva: 'Química', formatoProva: 'Presencial', notaMaximaProva: '20', turmaProva: '2º Ano A', status: 'statusProvaInativa' },
      { codigoProva: 'P006', nomeProva: 'Prova de Português - 2º Semestre', disciplinaProva: 'Português', formatoProva: 'Online', notaMaximaProva: '15', turmaProva: '1º Ano A', status: 'statusProvaAtiva' },
      { codigoProva: 'P007', nomeProva: 'Prova de Matemática - 2º Semestre', disciplinaProva: 'Matemática', formatoProva: 'Online', notaMaximaProva: '10', turmaProva: '3º Ano B', status: 'statusProvaAtiva' },
      { codigoProva: 'P008', nomeProva: 'Prova de Física - 1º Semestre', disciplinaProva: 'Física', formatoProva: 'Presencial', notaMaximaProva: '15', turmaProva: '2º Ano C', status: 'statusProvaEmElaboracao' },
      { codigoProva: 'P009', nomeProva: 'Prova de História - 2º Semestre', disciplinaProva: 'História', formatoProva: 'Online', notaMaximaProva: '20', turmaProva: '1º Ano C', status: 'statusProvaInativa' },
      { codigoProva: 'P010', nomeProva: 'Prova de Geografia - 2º Semestre', disciplinaProva: 'Geografia', formatoProva: 'Online', notaMaximaProva: '10', turmaProva: '3º Ano A', status: 'statusProvaAtiva' }
    ];
  }

  onClickVoltar() {
    this.route.navigate(['home']);
  }

  onClickAbrirModalNovaProva() {
    this.resetarFormularios();
    this.isGerarProvaIA = false;
    this.atualizarEstadoBotaoLoadingModal();
    this.modalNovaProva.open();
  }

  private _closeModalCriarNovaProva() {
    this.modalNovaProva.close();
  }

  private _closeModalExcluirProva() {
    this.modalExcluirProva.close();
  }

  onChangeTipoGeracao(event: any): void {
    this.tipoGeracaoProva = event;
    this.isGerarProvaIA = event === 'ia';
    this.atualizarEstadoBotaoLoadingModal();
  }


  switchGerarProva(event: any): void {
    this.isGerarProvaIA = event;
    this.atualizarEstadoBotaoLoadingModal();
  }

  private atualizarEstadoBotaoLoadingModal(): void {
    let isFormValid = false;
  
    if (this.tipoGeracaoProva === 'ia') {
      isFormValid = this.isFormIAValid;
    } else if (this.tipoGeracaoProva === 'manual') {
      isFormValid = this.isFormManualValid;
    } else if (this.tipoGeracaoProva === 'dinamica') {
      isFormValid = this.isFormIAValid;
    }
  
    this.confirmarNovaProva.disabled = !isFormValid;
  }

  private resetarFormularios(): void {
    this.formProvaManualService.resetFormData();
    this.formProvaIaService.resetFormData();
    this.formProvaDinamicaService.resetFormData();
  }

  private onVisualizarProva(prova: any) {
    console.log('Visualizar Prova: ', prova);
  }

  private onEditarProva(prova: any) {
    console.log('Editar Prova: ', prova);
  }

  private onExcluirProva(prova: any) {
    this.provaSelecionada = prova;
    this.modalExcluirProva.open();
  }

  private processExcluirProva() {
    console.log(this.provaSelecionada);
  }

  private processCriarNovaProva() {
    let formData;

    if (this.tipoGeracaoProva == 'ia') {
      formData = this.formProvaIaService.getFormData();
    } else if (this.tipoGeracaoProva == 'dinamica') {
      formData = this.formProvaDinamicaService.getFormData();
    } else {
      formData = this.formProvaManualService.getFormData();
    }

    if (formData) {
      this.route.navigate(['/cadastro-prova/incluir'], {
        state: {
          formData: formData,
          isGerarProvaIA: this.isGerarProvaIA,
          tipoGeracaoProva: this.tipoGeracaoProva
        }
      });
    } else {
      this.poNotification.error('Houve um erro ao criar a prova. Por favor, tente novamente.');
      this._closeModalCriarNovaProva();
      this.atualizarEstadoBotaoLoadingModal();
    }
  }

}

