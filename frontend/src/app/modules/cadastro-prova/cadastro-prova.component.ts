import { Component, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { CadastroProvaService } from './cadastro-prova.service';
import { Router } from '@angular/router';
import { FormGerarProvaManualService } from './form-gerar-prova-manual/form-gerar-prova-manual.service';
import { FormGerarProvaIaService } from './form-gerar-prova-ia/form-gerar-prova-ia.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { FormGerarProvaDinamicaService } from './form-gerar-prova-dinamica/form-gerar-prova-dincamica.service';
import { jsPDF } from 'jspdf';

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
  public filteredItemsCadastroProva: Array<any> = [];
  public searchTerm: string = '';
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
      action: this.onImprimirProva.bind(this),
      icon: 'ph ph-printer',
      label: 'Imprimir prova',
    },
    {
      action: this.onExcluirProva.bind(this),
      icon: 'ph ph-trash',
      label: 'Excluir',
      type: 'danger'
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
    this.loadTests();
  }

  private init() {
    this.colunasTabelaCadastroProva = this.cadastroProvaService.getColunasCadastroProva();
  }

  private loadTests() {
    this.cadastroProvaService.getAllTests().subscribe(
      (response: any) => {
        this.itemsCadastroProva = response.tests;
        this.filteredItemsCadastroProva = this.itemsCadastroProva;
      },
      (error) => {
        this.poNotification.error('Erro ao carregar provas');
      }
    );
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
    this.route.navigate(['ops']);
  }

  private onEditarProva(prova: any) {
    this.route.navigate(['ops']);
  }

  private onExcluirProva(prova: any) {
    this.provaSelecionada = prova;
    this.modalExcluirProva.open();
  }

  onShowMore(){
    
  }

  private processExcluirProva() {
    console.log('prova', this.provaSelecionada);
    if (!this.provaSelecionada || !this.provaSelecionada._id) {
      this.poNotification.error('Erro ao excluir prova: ID não encontrado.');
      return;
    }

    this.cadastroProvaService.deleteTest(this.provaSelecionada._id).subscribe(
      () => {
        this.poNotification.success('Prova excluída com sucesso!');
        this.loadTests();
        this._closeModalExcluirProva();
      },
      (error) => {
        this.poNotification.error('Erro ao excluir prova. Tente novamente.');
        console.error(error);
      }
    );
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

  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.filteredItemsCadastroProva = this.itemsCadastroProva;
    } else {
      this.filteredItemsCadastroProva = this.itemsCadastroProva.filter(item => {
        return (
          item.testCode?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.testName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.subject?.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.class?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.testType?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.status?.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    }
  }

  private onImprimirProva(prova: any) {
    if (!prova) {
      this.poNotification.error('Erro ao imprimir: Prova não encontrada.');
      return;
    }

    const doc = new jsPDF();
    const corPrimaria = "#045b8f";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(corPrimaria);
    doc.text(`Prova: ${prova.testName || 'Sem Nome'}`, 10, 15);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Código: ${prova.testCode || 'N/A'}`, 10, 25);
    doc.text(`Disciplina: ${prova.subject?.name || 'N/A'}`, 10, 32);
    doc.text(`Dificuldade: ${prova.difficultyLevel || 'N/A'}`, 10, 39);
    doc.text(`Tipo: ${prova.testType || 'N/A'}`, 10, 46);
    doc.text(`Número de Questões: ${prova.questions?.length || 0}`, 10, 53);

    doc.setDrawColor(corPrimaria);
    doc.line(10, 60, 200, 60);

    let yPosition = 70;
    prova.questions?.forEach((questao: any, index: number) => {
      if (!questao || !questao.statement) return;

      doc.setFont("helvetica", "bold");
      doc.setTextColor(corPrimaria);
      doc.text(`${index + 1}. ${questao.statement}`, 10, yPosition);

      yPosition += 8;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0);

      if (Array.isArray(questao.alternatives)) {
        questao.alternatives.forEach((alternativa: any, altIndex: number) => {
          doc.text(`${String.fromCharCode(65 + altIndex)}. ${alternativa.text}`, 15, yPosition);
          yPosition += 6;
        });
      }

      yPosition += 5;
      doc.setFont("helvetica", "italic");
      doc.setTextColor(255, 0, 0);

      const indexRespostaCorreta = questao.correctAnswer;
      const respostaCorreta = indexRespostaCorreta !== undefined && indexRespostaCorreta !== null
        ? `${String.fromCharCode(65 + indexRespostaCorreta)}. ${questao.alternatives[indexRespostaCorreta]?.text || 'N/A'}`
        : 'N/A';

      const respostaQuebrada = doc.splitTextToSize(`Resposta: ${respostaCorreta}`, 180);
      doc.text(respostaQuebrada, 15, yPosition);
      yPosition += respostaQuebrada.length * 6;
    });

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Gerado em: ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`, 10, 285);

    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  }

}
