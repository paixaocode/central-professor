import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-gerador-boletim',
  templateUrl: './gerador-boletim.component.html',
  styleUrls: ['./gerador-boletim.component.css']
})
export class GeradorBoletimComponent implements OnInit {
  boletimForm!: FormGroup;
  
  disciplinas: Array<{ label: string, value: string }> = [
    { label: 'MATEMÁTICA', value: 'matematica' },
    { label: 'PORTUGUÊS', value: 'portugues' },
    { label: 'CIÊNCIAS', value: 'ciencias' },
    { label: 'HISTÓRIA', value: 'historia' },
    { label: 'GEOGRAFIA', value: 'geografia' }
  ];

  notas: Array<{ label: string, value: number }> = [
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.boletimForm = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      turma: ['', Validators.required],
      professor: ['', Validators.required],
      frequencia: ['', [Validators.required]],
      ausencias: ['', [Validators.required]],
      observacoes: ['', Validators.required],
      disciplinas: this.fb.array([])
    });

    this.boletimForm.get('frequencia')?.valueChanges.subscribe(value => {
      this.adjustFrequencia(value);
    });

    this.boletimForm.get('ausencias')?.valueChanges.subscribe(value => {
      this.adjustAusencias(value);
    });
  }

  get disciplinasFormArray() {
    return this.boletimForm.get('disciplinas') as FormArray;
  }

  onClickAddDisciplina() {
    const disciplinaGroup = this.fb.group({
      disciplina: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });

    this.disciplinasFormArray.push(disciplinaGroup);
  }

  onClickEmitirBoletim() {
    if (this.boletimForm.valid) {
      console.log('Boletim:', this.boletimForm.value);
    } else {
      console.log('Formulário inválido');
    }
  }

  adjustFrequencia(value: number) {
    if (value > 100) {
      this.boletimForm.get('frequencia')?.setValue(100, { emitEvent: false });
    }
  }

  adjustAusencias(value: number) {
    if (value > 365) {
      this.boletimForm.get('ausencias')?.setValue(365, { emitEvent: false });
    }
  }

  removeDisciplina(index: number) {
    this.disciplinasFormArray.removeAt(index);
  }
}
