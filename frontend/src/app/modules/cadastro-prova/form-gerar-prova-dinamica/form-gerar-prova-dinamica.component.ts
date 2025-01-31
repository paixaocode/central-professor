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
    { label: 'Online', value: 'online' },
    { label: 'Presencial', value: 'presencial' }
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

  turmas = [
    { label: '1º Ano A', value: '1A' },
    { label: '1º Ano B', value: '1B' },
    { label: '2º Ano A', value: '2A' },
    { label: '2º Ano B', value: '2B' },
    { label: '3º Ano A', value: '3A' },
    { label: '3º Ano B', value: '3B' }
  ];

  disciplinas = [
    { label: 'Português', value: 'portugues' },
    { label: 'Matemática', value: 'matematica' },
    { label: 'Física', value: 'fisica' },
    { label: 'História', value: 'historia' },
    { label: 'Geografia', value: 'geografia' },
    { label: 'Química', value: 'quimica' }
  ];

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
      disciplina: ['', Validators.required]
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
  }
  
} 
