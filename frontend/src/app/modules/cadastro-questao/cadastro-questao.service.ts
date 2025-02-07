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
      { property: 'statement', type: 'string', label: 'Questão', width: '40%' },
      { property: 'subject.name', type: 'string', label: 'Matéria', width: '10%' },
      { property: 'topicId', type: 'string', label: 'Tópico', width: '10%' },
      { property: 'difficulty', type: 'string', label: 'Nível de dificuldade', width: '10%' },
      { property: 'grade.name', type: 'string', label: 'Grade', width: '10%' },
      { property: 'isPublic', type: 'boolean', label: 'Publica', width: '10%' },
      { property: 'accessibility', type: 'boolean', label: 'Acessibilidade', width: '10%' },
    ];
  }

  getQuestoesCadastradas(page: number): Observable<QuestaoObj> {
    return this.http.get<QuestaoObj>(`${API_URL}questions/allQuestions?page=${page}`);
  }
}
