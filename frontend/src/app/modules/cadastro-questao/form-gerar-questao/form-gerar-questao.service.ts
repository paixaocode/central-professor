import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CadastroQuestao, GradeObj, MateriaObj, } from '../cadastro-questao.models';
import { environment } from 'src/environments/environment';

const API_URL = environment.baseUrlBackEnd;
@Injectable({
  providedIn: 'root'
})
export class FormGerarQuestaoService {

  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();

  private formValidSubject = new BehaviorSubject<boolean>(false);
  formValid$ = this.formValidSubject.asObservable();

  constructor( private http: HttpClient) { }

  getSubjects(): Observable<MateriaObj> {
    return this.http.get<MateriaObj>(`${API_URL}subjects/allSubjects`);
  }

  getGrades(): Observable<GradeObj> {
    return this.http.get<GradeObj>(`${API_URL}grades/allGrades`);
  }

  postQuestionForm(data: CadastroQuestao): Observable<CadastroQuestao> {
    return this.http.post<CadastroQuestao>(`${API_URL}questions/create`, data);
  }

  deleteQuestion(id: string): Observable<CadastroQuestao> {
    return this.http.delete<CadastroQuestao>(`${API_URL}questions/${id}`);
  }

  resetFormData(): void {
    this.formDataSubject.next(null);
    this.formValidSubject.next(false);
  }
}
