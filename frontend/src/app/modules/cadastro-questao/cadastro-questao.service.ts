import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class CadastroQuestaoService {

  constructor(private http: HttpClient) { }

  getColunasCadastroQuestao(): Array<PoTableColumn> {
    return [
      { property: 'codigoQuestao', type: 'string', label: 'Código' },
      { property: 'nomeQuestao', type: 'string', label: 'Nome' },
      { property: 'disciplinaQuestao', type: 'string', label: 'Disciplina' },
      { property: 'formatoQuestao', type: 'string', label: 'Formato' },
      { property: 'notaMaximaQuestao', type: 'string', label: 'Nota Máxima' },
      { property: 'turmaQuestao', type: 'string', label: 'Turma' },
      {
        property: 'status', type: 'label', labels: [
          { value: 'statusQuestaoAtiva', color: 'color-10', label: 'Ativa'},
          { value: 'statusQuestaoInativa', color: 'color-07', label: 'Inativa'},
          { value: 'statusQuestaoEmElaboracao', color: 'color-02', label: 'Em Elaboração'},
        ]
      },
    ];
  }

}
