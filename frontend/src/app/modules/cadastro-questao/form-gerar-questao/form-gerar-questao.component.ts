import { Component, DestroyRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormGerarQuestaoService } from './form-gerar-questao.service';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Grade, GradeObj, MateriaForm, MateriaObj, Topic, } from '../cadastro-questao.models';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';

@Component({
  selector: 'app-form-gerar-questao',
  templateUrl: './form-gerar-questao.component.html',
  styleUrl: './form-gerar-questao.component.css'
})
export class FormGerarQuestaoComponent implements OnInit {
  
  @Output() limparFormulario = new EventEmitter<void>();
  form: UntypedFormGroup = new UntypedFormGroup({});

  formatosBool = [
    { label: 'Sim', value: 'true' },
    { label: 'Não', value: 'false' }
  ];

  formatosLevel = [
    { label: 'Fácil', value: 'Easy' },
    { label: 'Médio', value: 'Medium' },
    { label: 'Difícil', value: 'Hard' }
  ];

  formatosCorrectAnswer = [
    { label: '1', value: '0' },
    { label: '2', value: '1' },
    { label: '3', value: '2' },
    { label: '4', value: '3' }
  ];

  formatosSubject: Array<PoSelectOption> = [];
  formatosGrades: Array<PoSelectOption> = [];
  formatosTopics: Array<PoSelectOption> = [];
  subjectList: MateriaForm[] = [];

  constructor(
    private formService: FormGerarQuestaoService,
    private destroyRef: DestroyRef,
    private fb: UntypedFormBuilder,
    private poNotification: PoNotificationService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getGrades();
    this.getSubjects();
    this.onSubjectChange();
  }

  submitQuestionForm(): void {
    if (this.form.invalid) {
      return
    }

    const questionData = this.form.getRawValue();

    console.log(questionData);

    this.formService.postQuestionForm(questionData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.resetFormulario();
          this.poNotification.success('Questão cadastrada com sucesso!');
         },
        error: (err) => {
          const errorMessage = err.error?.message || 'Erro ao cadastrar a questão. Por favor, tente novamente mais tarde.';
          this.poNotification.error(errorMessage);
         }
      })
  }

  private getSubjects(): void {
    this.formService.getSubjects()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (subject: MateriaObj) => { 
          this.subjectList = subject.subjects;
          this.formatosSubject = this.subjectList.map((element: MateriaForm) => ({ label: element.name, value: element._id }));
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
          this.formatosGrades = gradeList.map((grade: Grade) => ({ label: grade.name, value: grade._id }));
         },
        error: () => { 
          this.formatosGrades.push({ label: 'Erro ao carregar! Por favor tente novamente mais tarde', value: 'Erro' });
        }
      })
  }

  private onSubjectChange(): void {
    this.form.get('subjectId')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(subjectId =>{
       this.updateTopics(subjectId)
    })
  }

  updateTopics(subjectId:string): void {
    // Filtra a matéria selecionada
    const selectedSubject = this.subjectList.find(subject => subject._id === subjectId);

    if (selectedSubject) {
      this.formatosTopics = selectedSubject.topics.map((topic: Topic) => (
        {
          label: topic.name,
          value: topic._id,
      }
    ));
    } else {
      this.formatosTopics = []; 
    }
    this.form.patchValue({
        topicId: null
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

  resetFormulario(): void {
    this.form.reset();
  }
}
