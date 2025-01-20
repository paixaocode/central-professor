import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroProvaService {

  constructor(private http: HttpClient) { }

  getColunasCadastroProva(): Array<PoTableColumn> {
    return [
      { property: 'codigoProva', type: 'string', label: 'Código' },
      { property: 'nomeProva', type: 'string', label: 'Nome' },
      { property: 'disciplinaProva', type: 'string', label: 'Disciplina' },
      { property: 'formatoProva', type: 'string', label: 'Formato' },
      { property: 'notaMaximaProva', type: 'string', label: 'Nota Máxima' },
      { property: 'turmaProva', type: 'string', label: 'Turma' },
      {
        property: 'status', type: 'label', labels: [
          { value: 'statusProvaAtiva', color: 'color-10', label: 'Ativa'},
          { value: 'statusProvaInativa', color: 'color-07', label: 'Inativa'},
          { value: 'statusProvaEmElaboracao', color: 'color-02', label: 'Em Elaboração'},
        ]
      },
    ];
  }

}
