import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CadastroQuestao, Grade, SubjectForm } from '../cadastro-questao.models';

const API_URL = 'http://localhost:3000/api'
@Injectable({
  providedIn: 'root'
})
export class FormGerarQuestaoService {

  constructor( private http: HttpClient) { }

  getSubjects(): Observable<SubjectForm> {
    return this.http.get<SubjectForm>(`${API_URL}/subjects/allSubjects`);
  }

  getGrades(): Observable<Grade> {
    return this.http.get<Grade>(`${API_URL}/grades/allGrades`);
  }

  postQuestionForm(data: CadastroQuestao): Observable<CadastroQuestao> {
    return this.http.post<CadastroQuestao>(`${API_URL}/questions/create`, data);
  }
}
