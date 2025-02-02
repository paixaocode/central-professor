import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormGerarQuestaoService } from './form-gerar-questao.service';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Grade, GradeObj, MateriaForm, MateriaObj, } from '../cadastro-questao.models';

type Select = {
  label: string;
  value: any;
}

@Component({
  selector: 'app-form-gerar-questao',
  templateUrl: './form-gerar-questao.component.html',
  styleUrl: './form-gerar-questao.component.css'
})
export class FormGerarQuestaoComponent implements OnInit {

  form: UntypedFormGroup = new UntypedFormGroup({});

  formatosBool = [
    { label: 'Sim', value: 'sim' },
    { label: 'Não', value: 'nao' }
  ];

  formatosLevel = [
    { label: 'Fácil', value: 'easy' },
    { label: 'Médio', value: 'Medium' },
    { label: 'Difícil', value: 'hard' }
  ];

  formatosCorrectAnswer = [
    { label: '1', value: '0' },
    { label: '2', value: '1' },
    { label: '3', value: '2' },
    { label: '4', value: '3' }
  ];

  formatosSubject: Select[] = [];
  formatosGrades: Select[] = [];

  constructor(
    private formService: FormGerarQuestaoService,
    private destroyRef: DestroyRef,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.getGrades();
    this.getSubjects();
    this.buildForm();
  }

  submitQuestionForm(): void {
    if (this.form.invalid) {
      return
    }

    const questionData = this.form.getRawValue();

    this.formService.postQuestionForm(questionData)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => { },
        error: () => { }
      })
  }

  private getSubjects(): void {
    this.formService.getSubjects()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (subject: MateriaObj) => { 
          const subjectList = subject.subjects;
          subjectList.forEach((element: MateriaForm) => {
            this.formatosSubject.push({ label: element.name, value: element._id });
          });
        },
        error: () => {
          this.formatosSubject.push({ label: 'Erro ao carregar! Por favor tente novamente mais tarde', value: 'Erro' });
         }
      })
  }

  private getGrades(): void {
    this.formService.getGrades()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (gradeObj: GradeObj) => {
          const gradeList = gradeObj.grades;
          gradeList.forEach((element: Grade) => {
            this.formatosGrades.push({ label: element.name, value: element._id });
          });
         },
        error: () => { 
          this.formatosGrades.push({ label: 'Erro ao carregar! Por favor tente novamente mais tarde', value: 'Erro' });
        }
      })
  }

  private buildForm(): void { 
    this.form = this.fb.group({
      statement: ['', Validators.required],
      isPublic: ['', Validators.required],
      alternatives: this.fb.array([
        this.createAlternativesForm(),
        this.createAlternativesForm(),
        this.createAlternativesForm(),
        this.createAlternativesForm()
      ]),
      correctAnswer: ['', Validators.required],
      subjectId: ['', Validators.required],
      topic: ['', Validators.required],
      gradeId: ['', Validators.required],
      difficulty: ['', Validators.required],
      acessibility: ['', Validators.required],
    });
  }

  private createAlternativesForm(): UntypedFormGroup {
    return this.fb.group({
      text: ['', Validators.required] 
    })
  }

  getAlternativesControls(): FormArray {
    return this.form.get('alternatives') as FormArray;
  }
}
