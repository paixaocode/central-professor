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

  quantidadeQuestoes = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
    { label: '30', value: 30 }
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
    private formService: FormGerarProvaManualService
  ) {}

  ngOnInit(): void {
    this.formGerarProvaManual = this.fb.group({
      nomeProva: ['', Validators.required],
      formatoProva: ['', Validators.required],
      notaMaximaProva: ['', Validators.required],
      turmaProva: ['', Validators.required],
      quantidadeQuestoes: ['', Validators.required],
      disciplina: ['', Validators.required]
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
  }
}
