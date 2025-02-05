import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormGerarProvaDinamicaService } from './form-gerar-prova-dincamica.service';


@Component({
  selector: 'app-form-gerar-prova-dinamica',
  templateUrl: './form-gerar-prova-dinamica.component.html',
  styleUrl: './form-gerar-prova-dinamica.component.css'
})
export class FormGerarProvaDinamicaComponent implements OnInit {

  formGerarProvaDinamica!: FormGroup;

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
  disciplinas: { value: string; label: string }[] = [];
  topicos: { value: string; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormGerarProvaDinamicaService
  ) {}

  ngOnInit(): void {
    this.formGerarProvaDinamica = this.fb.group({
      nomeProva: ['', Validators.required],
      formatoProva: ['', Validators.required],
      notaMaximaProva: ['', Validators.required],
      turmaProva: ['', Validators.required],
      disciplina: ['', Validators.required],
      topico: ['', Validators.required]
    });
  
    this.formGerarProvaDinamica.valueChanges.subscribe(() => {
      this.formService.setFormData(this.formGerarProvaDinamica.value);
    });
  
    this.formGerarProvaDinamica.statusChanges.subscribe(status => {
      const isValid = status === 'VALID';
      this.formService.setFormValid(isValid);
    });


    this.formService.formData$.subscribe(data => {
      if (data) {
        this.formGerarProvaDinamica.patchValue(data);
      } else {
        this.formGerarProvaDinamica.reset();
      }
    });

    this.formService.getDisciplinas().subscribe(data => {
      this.disciplinas = data;
    });

    this.formService.getGrades().subscribe(data => {
      this.turmas = data;
    });

    this.formGerarProvaDinamica.get('disciplina')?.valueChanges.subscribe(disciplineId => {
      if (disciplineId) {
        this.formService.getTopicsByDiscipline(disciplineId).subscribe(topics => {
          this.topicos = topics;
        });
      }
    });
  }
  
} 
