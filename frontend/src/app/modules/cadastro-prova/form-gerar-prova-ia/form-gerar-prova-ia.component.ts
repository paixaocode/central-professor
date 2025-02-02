import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormGerarProvaIaService } from './form-gerar-prova-ia.service';

@Component({
  selector: 'app-form-gerar-prova-ia',
  templateUrl: './form-gerar-prova-ia.component.html',
  styleUrls: ['./form-gerar-prova-ia.component.css']
})
export class FormGerarProvaIaComponent implements OnInit {
  formGerarProvaIA!: FormGroup;

  formatos = [
    { label: 'Online', value: 'online' },
    { label: 'Presencial', value: 'presencial' }
  ];

  nivelDificuldadeOptions = [
    { label: 'Fácil', value: 'facil' },
    { label: 'Médio', value: 'medio' },
    { label: 'Difícil', value: 'dificil' }
  ];

  disciplinas: { value: string; label: string }[] = [];

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

  turmas: { value: string; label: string }[] = [];

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

  constructor(
    private fb: FormBuilder,
    private formService: FormGerarProvaIaService
  ) {}

  ngOnInit(): void {
    this.formGerarProvaIA = this.fb.group({
      temaProva: ['', Validators.required],
      nivelDificuldade: ['', Validators.required],
      quantidadeQuestoes: ['', Validators.required],
      nomeProva: ['', Validators.required],
      disciplina: ['', Validators.required],
      turmaProva: ['', Validators.required],
      formatoProva: ['', Validators.required],
      notaMaximaProva: ['', Validators.required],
    });
  
    this.formGerarProvaIA.valueChanges.subscribe(() => {
      this.formService.setFormData(this.formGerarProvaIA.value);
    });
  
    this.formGerarProvaIA.statusChanges.subscribe(status => {
      const isValid = status === 'VALID';
      this.formService.setFormValid(isValid);
    });

    this.formService.formData$.subscribe(data => {
      if (data) {
        this.formGerarProvaIA.patchValue(data);
      } else {
        this.formGerarProvaIA.reset();
      }
    });

    this.formService.getDisciplinas().subscribe(data => {
      this.disciplinas = data;
    });

    this.formService.getGrades().subscribe(data => {
      this.turmas = data;
    });
  }
}
