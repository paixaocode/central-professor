import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGerarProvaManualService } from '../form-gerar-prova-manual.service';
import { InformationUserService } from 'src/app/services/informationUser.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-form-manual',
  templateUrl: './form-manual.component.html',
  styleUrls: ['./form-manual.component.css']
})
export class FormManualComponent implements OnInit, OnChanges {
  @Input() formData: any = {};
  @Input() isReadonly: boolean = false;
  @Input() readonlyData: any = {};
  @Input() disciplinas: { value: string; label: string }[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private formGerarProvaService: FormGerarProvaManualService,
    private informationUserService: InformationUserService,
    private poNotification: PoNotificationService
  ) {}
  

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges() {
    if (this.formData?.quantidadeQuestoes && !this.formData.questoes) {
      this.formData.questoes = new Array(this.formData.quantidadeQuestoes).fill('').map(() => ({
        texto: '',
        respostas: { A: '', B: '', C: '', D: '' },
        respostaCorreta: ''
      }));
    }

    if (this.formData?.disciplina && this.disciplinas.length > 0) {
      const disciplina = this.disciplinas.find(d => d.value === this.formData.disciplina);
      if (disciplina) {
        this.formData.disciplina = disciplina.label;
      }
    }
  }

  get questoes() {
    return this.form.get('questoes') as FormArray;
  }

  createForm() {
    const formArray: FormGroup[] = [];

    if (this.formData?.quantidadeQuestoes) {
      for (let i = 0; i < this.formData.quantidadeQuestoes; i++) {
        formArray.push(
          this.fb.group({
            texto: [{ value: '', disabled: this.isReadonly }, Validators.required],
            A: [{ value: '', disabled: this.isReadonly }, Validators.required],
            B: [{ value: '', disabled: this.isReadonly }, Validators.required],
            C: [{ value: '', disabled: this.isReadonly }, Validators.required],
            D: [{ value: '', disabled: this.isReadonly }, Validators.required],
            respostaCorreta: [{ value: '', disabled: this.isReadonly }, Validators.required],
          })
        );
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
  
    const userInfo = this.informationUserService.getUserInfo();
    const userId = userInfo?.id;
  
    if (!userId) {
      this.poNotification.error('Oops, não conseguimos salvar a prova!');
      return;
    }
  
    const disciplinaSelecionada = this.disciplinas.find((d) => d.label === this.formData.disciplina);
    const disciplinaId = disciplinaSelecionada ? disciplinaSelecionada.value : this.formData.disciplina;
  
    this.formGerarProvaService.getTopicsByDiscipline(disciplinaId).subscribe(topics => {
      if (!topics || topics.length === 0) {
        this.poNotification.error('Nenhum tópico encontrado para essa disciplina.');
        return;
      }
  
      const topicSelecionado = topics[0].value;
  
      const prova = {
        testCode: this.formData.nomeProva,
        testName: this.formData.nomeProva,
        subjectId: disciplinaId,
        testType: this.formData.formatoProva,
        maxScore: this.formData.notaMaximaProva,
        status: 'Aguardando',
        gradeId: this.formData.turmaProva,
        topic: topicSelecionado,
        difficultyLevel: 'Mixed',
        accessibility: false,
        numberOfQuestions: this.form.value.questoes.length,
        createdBy: userId,
        questions: this.form.value.questoes.map((questao: any) => ({
          statement: questao.texto,
          alternatives: [
            { text: questao.A },
            { text: questao.B },
            { text: questao.C },
            { text: questao.D }
          ],
          correctAnswer: ['A', 'B', 'C', 'D'].indexOf(questao.respostaCorreta),
          accessibility: false,
          difficulty: 'Mixed',
          topic: topicSelecionado,
          isPublic: false
        })),
      };
  
      this.formGerarProvaService.saveTest(prova).subscribe({
        next: (response) => {
          this.poNotification.success('Prova salva com sucesso!');
          this.route.navigate(['/cadastro-prova']);
        },
        error: (error) => {
          console.error('Erro ao salvar a prova:', error);
          this.poNotification.error('Ocorreu um erro ao salvar a prova. Por favor, tente novamente mais tarde.');
        }
      });
    });
  }
}
