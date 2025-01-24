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

  questoes = [
    { 
      pergunta: "asdasd", 
      alternativas: ["oi", "as", "waded", "asd"], 
      resposta: "xxxx"
    },
    { 
      pergunta: "teste ss", 
      alternativas: ["321313", "sdfsf", "Dsdf", "gbvc"], 
      resposta: "ddddddddd"
    }
  ];

  ngOnInit(): void {
    console.log(this.dadosProva);
  }

  baixarCopiaDaProva() {
    this.isLoading = true;

    setTimeout(() => {
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Prova: " + this.dadosProva.disciplinaProva, 10, 10);

      doc.setFont("helvetica", "normal");
      let yPosition = 20;
      this.questoes.forEach((questao, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${questao.pergunta}`, 10, yPosition);

        yPosition += 10;
        questao.alternativas.forEach((alternativa, altIndex) => {
          doc.text(`${String.fromCharCode(65 + altIndex)}. ${alternativa}`, 10, yPosition);
          yPosition += 7;
        });

        yPosition += 5;
        doc.setFont("helvetica", "italic");
        doc.text(`Resposta: ${questao.resposta}`, 10, yPosition);
        yPosition += 15;
      });

      doc.save(`${this.dadosProva.disciplinaProva}_prova.pdf`);

      this.isLoading = false;
    }, 2000);
  }
}
