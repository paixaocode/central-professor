import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import jsPDF from 'jspdf';

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
    { label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 },
    { label: '4', value: 4 }, { label: '5', value: 5 }, { label: '6', value: 6 },
    { label: '7', value: 7 }, { label: '8', value: 8 }, { label: '9', value: 9 }, { label: '10', value: 10 }
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
      disciplinas: this.fb.array([]),
    });
  }

  get disciplinasFormArray() {
    return this.boletimForm.get('disciplinas') as FormArray;
  }

  onClickAddDisciplina() {
    const disciplinaGroup = this.fb.group({
      disciplina: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });

    this.disciplinasFormArray.push(disciplinaGroup);
  }

  calcularMedia(disciplinas: any[]) {
    const somaNotas = disciplinas.reduce((acc, d) => acc + d.nota, 0);
    return somaNotas / disciplinas.length;
  }

  onClickEmitirBoletim() {
    if (!this.boletimForm.valid) {
      console.log('Formulário inválido');
      return;
    }

    const boletim = this.boletimForm.value;
    const mediaFinal = this.calcularMedia(boletim.disciplinas);
    const doc = new jsPDF();

    doc.setFillColor(4, 91, 143);
    doc.rect(0, 0, 210, 30, 'F');

    // Título
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('Boletim Escolar - Teacher Digi', 15, 20);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('times', 'bold');
    doc.text(`Nome: ${boletim.nome}`, 15, 40);
    doc.setFont('times', 'normal');
    doc.text(`Matrícula: ${boletim.matricula}`, 15, 50);
    doc.text(`Turma: ${boletim.turma}`, 15, 60);
    doc.text(`Professor: ${boletim.professor}`, 15, 70);
    doc.text(`Frequência: ${boletim.frequencia}%`, 15, 80);
    doc.text(`Ausências: ${boletim.ausencias}`, 15, 90);
    doc.text(`Observações: ${boletim.observacoes}`, 15, 100);

    let y = 110;
    doc.setFillColor(4, 91, 143);
    doc.setTextColor(255, 255, 255);
    doc.rect(15, y, 180, 10, 'F');
    doc.text('Disciplina', 20, y + 7);
    doc.text('Nota', 160, y + 7);
    
    y += 15;
    doc.setTextColor(0, 0, 0);
    
    boletim.disciplinas.forEach((d: any) => {
      doc.text(d.disciplina.toUpperCase(), 20, y);
      doc.text(d.nota.toString(), 160, y);
      y += 10;
    });

    const mediaColor = mediaFinal >= 6 ? [4, 91, 143] : [255, 0, 0];
    doc.setTextColor(mediaColor[0], mediaColor[1], mediaColor[2]);
    doc.setFontSize(14);
    doc.text(`Média Final: ${mediaFinal.toFixed(2)}`, 15, y + 10);

    const dataHora = new Date();
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Gerado em: ${dataHora.toLocaleString()}`, 15, y + 25);

    doc.setFontSize(12);
    doc.text('______________________________________________', 15, y + 40);
    doc.text('Assinatura do Professor', 15, y + 45);
    doc.text('______________________________________________', 105, y + 40);
    doc.text('Assinatura do Aluno', 105, y + 45);

    doc.save(`boletim_${boletim.nome}.pdf`);
  }

  removeDisciplina(index: number) {
    this.disciplinasFormArray.removeAt(index);
  }
}
