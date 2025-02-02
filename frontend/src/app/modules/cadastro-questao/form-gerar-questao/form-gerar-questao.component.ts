import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormGerarQuestaoService } from './form-gerar-questao.service';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Grade, SubjectForm } from '../cadastro-questao.models';

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
    { label: 'Nã0', value: 'nao' }
  ];

  formatosLevel = [
    { label: 'Fácil', value: 'easy' },
    { label: 'Médio', value: 'Medium' },
    { label: 'Difícil', value: 'hard' }
  ];

  formatosCorrectAnswer = [
    { label: 'A', value: '0' },
    { label: 'B', value: '1' },
    { label: 'C', value: '2' },
    { label: 'D', value: '3' }
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
        next: (subject: SubjectForm) => { 
          this.formatosSubject.push({ label: subject.name, value: subject.id });
        },
        error: () => { }
      })
  }

  private getGrades(): void {
    this.formService.getGrades()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (grade: Grade) => {
          this.formatosGrades.push({ label: grade.name, value: grade.id });
         },
        error: () => { }
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
