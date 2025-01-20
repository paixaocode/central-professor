import { Component, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoTableColumn } from '@po-ui/ng-components';
import { CadastroProvaService } from './cadastro-prova.service';
import { Router } from '@angular/router';
import { FormGerarProvaManualService } from './form-gerar-prova-manual/form-gerar-prova-manual.service';
import { FormGerarProvaIaService } from './form-gerar-prova-ia/form-gerar-prova-ia.service';
@Component({
  selector: 'app-cadastro-prova',
  templateUrl: './cadastro-prova.component.html',
  styleUrls: ['./cadastro-prova.component.css']
})
export class CadastroProvaComponent {

  @ViewChild('modalNovaProva') modalNovaProva!: PoModalComponent;

  public colunasTabelaCadastroProva: Array<PoTableColumn> = [];
  public itemsCadastroProva: Array<any> = [];
  public isGerarProvaIA: boolean = false;

  public isFormManualValid: boolean = false;
  public isFormIAValid: boolean = false;

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

  isFormValid: boolean = false;

  constructor(
    private cadastroProvaService: CadastroProvaService,
    private route: Router,
    private formProvaManualService: FormGerarProvaManualService,
    private formProvaIaService: FormGerarProvaIaService
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
      { codigoProva: 'P003', nomeProva: 'Prova de História - 1º Semestre', disciplinaProva: 'História', formatoProva: 'Presencial', notaMaximaProva: '15', turmaProva: '3º Ano C', status: 'statusProvaRecebido' },
      { codigoProva: 'P004', nomeProva: 'Prova de Geografia - 1º Semestre', disciplinaProva: 'Geografia', formatoProva: 'Online', notaMaximaProva: '10', turmaProva: '1º Ano B', status: 'statusProvaAtiva' },
      { codigoProva: 'P005', nomeProva: 'Prova de Química - 3º Semestre', disciplinaProva: 'Química', formatoProva: 'Presencial', notaMaximaProva: '20', turmaProva: '2º Ano A', status: 'statusProvaInativa' },
      { codigoProva: 'P006', nomeProva: 'Prova de Português - 2º Semestre', disciplinaProva: 'Português', formatoProva: 'Online', notaMaximaProva: '15', turmaProva: '1º Ano A', status: 'statusProvaRecebido' },
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


  switchGerarProva(event: any): void {
    this.isGerarProvaIA = event;
    this.atualizarEstadoBotaoLoadingModal();
  }

  private atualizarEstadoBotaoLoadingModal(): void {
    const isFormValid = this.isGerarProvaIA ? this.isFormIAValid : this.isFormManualValid;
    this.confirmarNovaProva.disabled = !isFormValid;
  }

  private resetarFormularios(): void {
    this.formProvaManualService.resetFormData();
    this.formProvaIaService.resetFormData();
  }
  

  private processCriarNovaProva() {
    let formData;

    if (this.isGerarProvaIA) {
      formData = this.formProvaIaService.getFormData();
    } else {
      formData = this.formProvaManualService.getFormData();
    }

    if (formData) {
      console.log('d form', formData)
    } else {
      console.error('erro caiu no else');
    }
  }
}

