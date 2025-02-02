import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformacoesProvaService {

  private baseUrl = environment.baseUrlBackEnd;

  constructor(private http: HttpClient) {}

  getDisciplinas(): Observable<{ value: string; label: string }[]> {
    return this.http.get<any>(`${this.baseUrl}subjects/allSubjects`).pipe(
      map((response: any) => {
        return response.subjects.map((disciplina: { _id: any; name: any; }) => ({
          value: disciplina._id,
          label: disciplina.name
        }));
      })
    );
  }

  getGrades(): Observable<{ value: string; label: string }[]> {
    return this.http.get<any>(`${this.baseUrl}grades/allGrades`).pipe(
      map((response: any) => {
        return response.grades.map((grade: { _id: any; name: string }) => ({
          value: grade._id,
          label: grade.name
        }));
      })
    );
  }
}
