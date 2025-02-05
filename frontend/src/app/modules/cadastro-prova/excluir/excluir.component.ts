import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent {

  @Input() dadosProva: any;
  public isLoading: boolean = false;

  ngOnInit(): void {
    console.log('Dados da prova recebidos:', this.dadosProva);
  }

  baixarCopiaDaProva() {
    this.isLoading = true;

    setTimeout(() => {
      if (!this.dadosProva) {
        console.error('Erro: dadosProva está indefinido.');
        this.isLoading = false;
        return;
      }

      if (!Array.isArray(this.dadosProva.questions)) {
        console.warn('Aviso: Não há questões disponíveis para exportação.');
        this.dadosProva.questions = [];
      }

      const doc = new jsPDF();
      const corPrimaria = "#045b8f";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(corPrimaria);
      doc.text(`Prova: ${this.dadosProva.testName || 'Sem Nome'}`, 10, 15);

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Código: ${this.dadosProva.testCode || 'N/A'}`, 10, 25);
      doc.text(`Disciplina: ${this.dadosProva.subject?.name || 'N/A'}`, 10, 32);
      doc.text(`Dificuldade: ${this.dadosProva.difficultyLevel || 'N/A'}`, 10, 39);
      doc.text(`Tipo: ${this.dadosProva.testType || 'N/A'}`, 10, 46);
      doc.text(`Número de Questões: ${this.dadosProva.questions.length}`, 10, 53);

      doc.setDrawColor(corPrimaria);
      doc.line(10, 60, 200, 60);

      let yPosition = 70;
      this.dadosProva.questions.forEach((questao: any, index: number) => {
        if (!questao || !questao.statement) return;

        doc.setFont("helvetica", "bold");
        doc.setTextColor(corPrimaria);
        doc.text(`${index + 1}. ${questao.statement}`, 10, yPosition);
        
        yPosition += 8;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0);

        if (Array.isArray(questao.alternatives)) {
          questao.alternatives.forEach((alternativa: any, altIndex: number) => {
            doc.text(`${String.fromCharCode(65 + altIndex)}. ${alternativa.text}`, 15, yPosition);
            yPosition += 6;
          });
        }

        yPosition += 5;
        doc.setFont("helvetica", "italic");
        doc.setTextColor(255, 0, 0);
        
        const indexRespostaCorreta = questao.correctAnswer;
        const respostaCorreta = indexRespostaCorreta !== undefined && indexRespostaCorreta !== null 
          ? `${String.fromCharCode(65 + indexRespostaCorreta)}. ${questao.alternatives[indexRespostaCorreta]?.text || 'N/A'}` 
          : 'N/A';

        const respostaQuebrada = doc.splitTextToSize(`Resposta: ${respostaCorreta}`, 180);

        doc.text(respostaQuebrada, 15, yPosition);
        yPosition += respostaQuebrada.length * 6;
      });

      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Gerado em: ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`, 10, 285);

      doc.save(`${this.dadosProva.testName || 'prova'}.pdf`);
      this.isLoading = false;
    }, 2000);
  }

}
