import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { QuestaoObj } from './cadastro-questao.models';

const API_URL = environment.baseUrlBackEnd;

@Injectable({
  providedIn: 'root'
})
export class CadastroQuestaoService {

  constructor(private http: HttpClient) { }

  getColunasCadastroQuestao(): Array<PoTableColumn> {
    return [
      { property: 'codigoQuestao', type: 'string', label: 'Código' },
      { property: 'statement', type: 'string', label: 'Questão' },
      { property: 'subjectId', type: 'string', label: 'Matéria' },
      { property: 'topic', type: 'string', label: 'Tópico' },
      { property: 'difficulty', type: 'string', label: 'Nível de dificuldade' },
      { property: 'gradeId', type: 'string', label: 'Grade' },
      { property: 'isPublic', type: 'boolean', label: 'Publica' },
      { property: 'acessibility', type: 'boolean', label: 'Acessibilidade' },
    ];
  }

  getQuestoesCadastradas(page: number): Observable<QuestaoObj> {
    return this.http.get<QuestaoObj>(`${API_URL}questions/allQuestions?page=${page}`);
  }
}
