import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

interface Respostas {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface Questao {
  texto: string;
  respostas: Respostas;
  respostaCorreta: string;
}

@Component({
  selector: 'app-form-manual',
  templateUrl: './form-manual.component.html',
  styleUrls: ['./form-manual.component.css']
})
export class FormManualComponent implements OnInit, OnChanges {
  @Input() formData: any = {};
  @Input() isGerarProvaIA: boolean = false;
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private route: Router) { }

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
  }

  get questoes() {
    return (this.form.get('questoes') as FormArray);
  }

  createForm() {
    const formArray: FormGroup[] = [];

    if (this.formData?.quantidadeQuestoes) {
      for (let i = 0; i < this.formData.quantidadeQuestoes; i++) {
        formArray.push(this.fb.group({
          texto: ['', Validators.required],
          A: ['', Validators.required],
          B: ['', Validators.required],
          C: ['', Validators.required],
          D: ['', Validators.required],
          respostaCorreta: ['', Validators.required],
        }));
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
    const prova = {
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
      }))
    };

  }

  isFormValid(): boolean {

    const formValid = this.form.valid;
    this.form.controls['questoes'].value.forEach((questao: any, index: number) => {
      console.log(`questap ${index + 1} - ok`,
        questao.texto && questao.A && questao.B && questao.C && questao.D && questao.respostaCorreta
      );
    });

    return formValid;
  }
}
