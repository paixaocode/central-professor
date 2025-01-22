import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { GeminiApiService } from 'src/app/services/geminiApi.service';

@Component({
  selector: 'app-form-ia',
  templateUrl: './form-ia.component.html',
  styleUrls: ['./form-ia.component.css']
})
export class FormIaComponent implements OnInit {

  @Input() formData: any;
  @Input() isGerarProvaIA: boolean = false;
  @Input() isReadonly: boolean = false;
  form: FormGroup = new FormGroup({});

  public isConsultaIAEmAndamento: boolean = true;
  public textLoadingConsultaIA: string = 'Consultando IA...';
  public provaGerada: any = null;

  constructor(private fb: FormBuilder, private route: Router, private geminiApiService: GeminiApiService) { }

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

    const prova = {
      nomeProva: this.formData.nomeProva,
      temaProva: this.formData.temaProva,
      formatoProva: this.formData.formatoProva,
      notaMaximaProva: this.formData.notaMaximaProva,
      turmaProva: this.formData.turmaProva,
      disciplina: this.formData.disciplina,
      quantidadeQuestoes: this.formData.quantidadeQuestoes,
      questoes: this.form.value.questoes.map((questao: any) => ({
        texto: questao.texto,
        respostas: {
          A: questao.A,
          B: questao.B,
          C: questao.C,
          D: questao.D,
        },
        respostaCorreta: questao.respostaCorreta,
      }))
    };

    console.log('Prova gerada:', prova);
  }
}
