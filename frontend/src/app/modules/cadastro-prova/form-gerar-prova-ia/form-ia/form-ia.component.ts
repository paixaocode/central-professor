import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { GeminiApiService } from 'src/app/services/geminiApi.service';
import { InformationUserService } from 'src/app/services/informationUser.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { FormGerarProvaIaService } from '../form-gerar-prova-ia.service';

@Component({
  selector: 'app-form-ia',
  templateUrl: './form-ia.component.html',
  styleUrls: ['./form-ia.component.css']
})
export class FormIaComponent implements OnInit {

  @Input() formData: any;
  @Input() isGerarProvaIA: boolean = false;
  @Input() isReadonly: boolean = false;
  @Input() disciplinas: { value: string; label: string }[] = [];
  form: FormGroup = new FormGroup({});

  public isConsultaIAEmAndamento: boolean = true;
  public textLoadingConsultaIA: string = 'Consultando IA';
  public provaGerada: any = null;

  constructor(private fb: FormBuilder, 
    private route: Router, 
    private geminiApiService: GeminiApiService,
    private informationUserService: InformationUserService,
    private poNotification: PoNotificationService,
    private formGerarProvaIA: FormGerarProvaIaService) { }

  ngOnInit() {
    this.fetchGeminiIA();
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

  get questoes() {
    return this.form.get('questoes') as FormArray;
  }

  createForm() {
    const formArray: FormGroup[] = [];

    if (this.formData?.quantidadeQuestoes) {
      for (let i = 0; i < this.formData.quantidadeQuestoes; i++) {
        const questao = this.formData.questoes[i];

        formArray.push(
          this.fb.group({
            texto: [
              { value: questao?.texto?.toUpperCase() || '', disabled: this.isReadonly },
              Validators.required
            ],
            A: [
              { value: questao?.respostas?.A?.toUpperCase() || '', disabled: this.isReadonly },
              Validators.required
            ],
            B: [
              { value: questao?.respostas?.B?.toUpperCase() || '', disabled: this.isReadonly },
              Validators.required
            ],
            C: [
              { value: questao?.respostas?.C?.toUpperCase() || '', disabled: this.isReadonly },
              Validators.required
            ],
            D: [
              { value: questao?.respostas?.D?.toUpperCase() || '', disabled: this.isReadonly },
              Validators.required
            ],
            respostaCorreta: [
              { value: questao?.respostaCorreta?.toUpperCase() || '', disabled: this.isReadonly },
              Validators.required
            ],
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

  fetchGeminiIA() {
    const provaData = {
      nomeProva: this.formData?.nomeProva,
      temaProva: this.formData?.temaProva,
      formatoProva: this.formData?.formatoProva,
      notaMaximaProva: this.formData?.notaMaximaProva,
      turmaProva: this.formData?.turmaProva,
      disciplina: this.formData?.disciplina,
      quantidadeQuestoes: this.formData?.quantidadeQuestoes
    };

    this.geminiApiService.gerarProva(provaData).subscribe(
      response => {
        this.provaGerada = response;
        this.formData.questoes = this.provaGerada.questoes;
        this.createForm();
        this.isConsultaIAEmAndamento = false;
      },
      error => {
        console.error('Erro ao consultar Gemini:', error);
        this.isConsultaIAEmAndamento = false;
      }
    );
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
  
    this.formGerarProvaIA.getTopicsByDiscipline(disciplinaId).subscribe(topics => {
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
  
      this.formGerarProvaIA.saveTest(prova).subscribe({
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
