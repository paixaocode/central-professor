import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoTreeViewItem } from '@po-ui/ng-components';
import { FormGerarProvaDinamicaService } from '../form-gerar-prova-dincamica.service';

interface QuestaoTreeViewItem extends PoTreeViewItem {
  _id: string;
  statement: string;
  alternatives: { text: string, _id: string }[];
  correctAnswer: number;
}

@Component({
  selector: 'app-form-dinamica',
  templateUrl: './form-dinamica.component.html',
  styleUrls: ['./form-dinamica.component.css']
})
export class FormDinamicaComponent implements OnInit, OnChanges {

  @ViewChild('modalEscolherQuestao', { static: false }) modalEscolherQuestao!: PoModalComponent;

  @Input() formData: any = {};
  @Input() isReadonly: boolean = false;
  @Input() readonlyData: any = {};
  form: FormGroup = new FormGroup({});
  treeItems: PoTreeViewItem[] = [];

  constructor(private fb: FormBuilder, 
    private route: Router,
    private formService: FormGerarProvaDinamicaService) {}

    fecharModal: PoModalAction = {
      action: () => {
        this.fecharModalSelect();
      },
      label: 'Fechar',
      loading: false,
      disabled: false
    };

  ngOnInit() {
    this.createForm();
    this.carregarQuestoes();
  }

  ngOnChanges() {
    if (this.formData?.quantidadeQuestoes && !this.formData.questoes) {
      this.formData.questoes = new Array(this.formData.quantidadeQuestoes).fill('').map(() => ({
        texto: '',
        respostas: { A: '', B: '', C: '', D: '' },
        respostaCorreta: ''
      }));
    }
  }

  carregarQuestoes() {
    this.formService.getAllQuestions().subscribe({
      next: (data) => {
        console
        this.treeItems = this.formatarQuestoesParaTreeView(data.questions);
      },
      error: (err) => {
        console.error('Erro ao buscar questões', err);
      }
    });
  }

  formatarQuestoesParaTreeView(questions: any[]): PoTreeViewItem[] {
    const disciplinasMap = new Map<string, PoTreeViewItem>();
  
    questions.forEach((questao) => {
      const disciplinaNome = questao.subject.name;
      const questaoItem: QuestaoTreeViewItem = {
        label: questao.statement,
        value: questao._id,
        _id: questao._id,
        statement: questao.statement,
        correctAnswer: questao.correctAnswer,
        subItems: [],
        alternatives: questao.alternatives
      };

      if (!disciplinasMap.has(disciplinaNome)) {
        disciplinasMap.set(disciplinaNome, {
          label: disciplinaNome,
          value: disciplinaNome,
          expanded: true,
          subItems: []
        });
      }
  
      disciplinasMap.get(disciplinaNome)!.subItems!.push(questaoItem);
    });
    return Array.from(disciplinasMap.values());
  }
  
  onQuestaoSelecionada(item: PoTreeViewItem) {
    const questaoSelecionada = this.treeItems
      .flatMap((item: PoTreeViewItem) => item.subItems)
      .find((questao) => (questao as QuestaoTreeViewItem)._id === item.value);
  
    if (questaoSelecionada) {
      this.adicionarQuestaoNoForm(questaoSelecionada as QuestaoTreeViewItem);
    } else {
      const subquestoes = item.subItems || [];
      subquestoes.forEach((subquestao: PoTreeViewItem) => {
        if ((subquestao as QuestaoTreeViewItem)._id) {
          this.adicionarQuestaoNoForm(subquestao as QuestaoTreeViewItem);
        }
      });
    }
  }
  
  
  
  adicionarQuestaoNoForm(questao: QuestaoTreeViewItem) {
    const novaQuestao = this.fb.group({
      texto: [questao.statement, Validators.required],
      A: ['', Validators.required],
      B: ['', Validators.required],
      C: ['', Validators.required],
      D: ['', Validators.required],
      respostaCorreta: ['', Validators.required],
    });
  
    const alternativas = questao.alternatives || [];
  
    novaQuestao.patchValue({
      A: alternativas[0]?.text || '',
      B: alternativas[1]?.text || '',
      C: alternativas[2]?.text || '',
      D: alternativas[3]?.text || '',
      respostaCorreta: this.mapearRespostaCorreta(questao.correctAnswer),
    });
  
    this.questoes.push(novaQuestao);
  }

  mapearRespostaCorreta(indice: number): string {
    const respostas = ['A', 'B', 'C', 'D'];
    return respostas[indice] || '';
  }
  
  onQuestaoDesmarcada(event: any) {
    const questaoDesmarcada = this.treeItems
      .flatMap((item: PoTreeViewItem) => item.subItems)
      .find((questao) => (questao as QuestaoTreeViewItem)._id === event._id);
  
    if (questaoDesmarcada) {
      this.removerQuestaoDoForm(questaoDesmarcada as QuestaoTreeViewItem);
    } else {
      const subquestoes = event.subItems || [];
      subquestoes.forEach((subquestao: PoTreeViewItem) => {
        if ((subquestao as QuestaoTreeViewItem)._id) {
          this.removerQuestaoDoForm(subquestao as QuestaoTreeViewItem);
        }
      });
    }
  }
  
  
  removerQuestaoDoForm(questao: QuestaoTreeViewItem) {
    const questaoIndex = this.questoes.controls.findIndex(
      (questaoControl: AbstractControl) => {
        if (questaoControl instanceof FormGroup) {
          return questaoControl.get('texto')?.value === questao.statement;
        }
        return false;
      }
    );
  
    if (questaoIndex > -1) {
      this.questoes.removeAt(questaoIndex);
    }
  }
  
  
  get questoes() {
    return this.form.get('questoes') as FormArray;
  }

  createForm() {
    const formArray: FormGroup[] = [];
  
    if (this.formData?.quantidadeQuestoes) {
      for (let i = 0; i < this.formData.quantidadeQuestoes; i++) {
        const questaoFormGroup = this.fb.group({
          texto: [{ value: '', disabled: this.isReadonly }, Validators.required],
          A: [{ value: '', disabled: this.isReadonly }, Validators.required],
          B: [{ value: '', disabled: this.isReadonly }, Validators.required],
          C: [{ value: '', disabled: this.isReadonly }, Validators.required],
          D: [{ value: '', disabled: this.isReadonly }, Validators.required],
          respostaCorreta: [{ value: '', disabled: this.isReadonly }, Validators.required],
        });
  
        formArray.push(questaoFormGroup);
      }
    }
  
    this.form = this.fb.group({
      questoes: this.fb.array(formArray)
    });
  }
  

  onClickVoltar() {
    this.route.navigate(['/cadastro-prova']);
  }

  onRadioChange(event: any, questionIndex: number) {
    const selectedOption = event;
    const question = this.formData.questoes[questionIndex];
    question.respostaCorreta = selectedOption;
    question.respostas[selectedOption] = 'x';
  }  

  abrirModalAdicionarQuestao() {
    this.modalEscolherQuestao.open();
  }
  
  fecharModalSelect() {
    this.modalEscolherQuestao.close();
  }

  onFocusInput(index: number): void {
    this.modalEscolherQuestao.open();
  }
  
  getIcon(index: number, option: string): string {
    const respostaCorreta = this.questoes.at(index).get('respostaCorreta')?.value;

    if (respostaCorreta === option) {
      return 'ph ph-check';
    } else {
      return 'ph ph-smiley-sad';
    }
  }

  onSubmit() {
    if (this.isReadonly) return;

    const prova = {
      nomeProva: this.formData.nomeProva,
      formatoProva: this.formData.formatoProva,
      notaMaximaProva: this.formData.notaMaximaProva,
      turmaProva: this.formData.turmaProva,
      disciplina: this.formData.disciplina,
      quantidadeQuestoes: this.formData.quantidadeQuestoes,
      questoes: this.form.value.questoes.map((questao: any, index: number) => ({
        texto: questao.texto,
        respostas: {
          A: questao.A,
          B: questao.B,
          C: questao.C,
          D: questao.D,
        },
        respostaCorreta: questao.respostaCorreta,
      })),
    };
    console.log('prova', prova);
  }
}