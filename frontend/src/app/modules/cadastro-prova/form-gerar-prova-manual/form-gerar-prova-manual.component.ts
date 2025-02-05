import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormGerarProvaManualService } from './form-gerar-prova-manual.service';

@Component({
  selector: 'app-form-gerar-prova-manual',
  templateUrl: './form-gerar-prova-manual.component.html',
  styleUrls: ['./form-gerar-prova-manual.component.css']
})
export class FormGerarProvaManualComponent implements OnInit {

  formGerarProvaManual!: FormGroup;

  formatos = [
    { label: 'Online', value: 'Online' },
    { label: 'Presencial', value: 'Presencial' }
  ];

  notasMaximas = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 }
  ];

  turmas: { value: string; label: string }[] = [];

  quantidadeQuestoes = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 }
  ];

  disciplinas: { value: string; label: string }[] = [];
  topicos: { value: string; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormGerarProvaManualService
  ) {}

  ngOnInit(): void {
    this.formGerarProvaManual = this.fb.group({
      nomeProva: ['', Validators.required],
      formatoProva: ['', Validators.required],
      notaMaximaProva: ['', Validators.required],
      turmaProva: ['', Validators.required],
      quantidadeQuestoes: ['', Validators.required],
      disciplina: ['', Validators.required],
      topico: ['', Validators.required]
    });

    this.formGerarProvaManual.valueChanges.subscribe(() => {
      this.formService.setFormData(this.formGerarProvaManual.value);
    });

    this.formGerarProvaManual.statusChanges.subscribe(status => {
      const isValid = status === 'VALID';
      this.formService.setFormValid(isValid);
    });

    this.formService.formData$.subscribe(data => {
      if (data) {
        this.formGerarProvaManual.patchValue(data);
      } else {
        this.formGerarProvaManual.reset();
      }
    });

    this.formService.getDisciplinas().subscribe(data => {
      this.disciplinas = data;
    });

    this.formService.getGrades().subscribe(data => {
      this.turmas = data;
    });

    this.formGerarProvaManual.get('disciplina')?.valueChanges.subscribe(disciplineId => {
      if (disciplineId) {
        this.formService.getTopicsByDiscipline(disciplineId).subscribe(topics => {
          this.topicos = topics;
        });
      }
    });
  }
}
