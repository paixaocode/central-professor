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

  private apiUrl = `${environment.baseUrlBackEnd}tests`;

  getColunasCadastroProva(): Array<PoTableColumn> {
    return [
      { property: 'testCode', type: 'string', label: 'Código' },
      { property: 'testName', type: 'string', label: 'Nome' },
      { property: 'subject.name', type: 'string', label: 'Disciplina' },
      { property: 'testType', type: 'string', label: 'Formato' },
      { property: 'maxScore', type: 'string', label: 'Nota Máxima' },
      { property: 'grade.name', type: 'string', label: 'Turma' },
      {
        property: 'status', type: 'label', labels: [
          { value: 'Aguardando', color: 'color-02', label: 'Aguardando' },
          { value: 'Ativa', color: 'color-10', label: 'Ativa' },
          { value: 'Inativa', color: 'color-07', label: 'Inativa' }
        ]
      }
    ];
  }
  
  getAllTests(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/allTests`);
  }

  deleteTest(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
}
