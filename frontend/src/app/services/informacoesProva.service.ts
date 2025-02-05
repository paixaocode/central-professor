import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

// informacoesProva.service.ts
@Injectable({
  providedIn: 'root'
})
export class InformacoesProvaService {

  private baseUrl = environment.baseUrlBackEnd;

  constructor(private http: HttpClient) {}

  getDisciplinas(): Observable<{ value: string; label: string }[]> {
    return this.http.get<any>(`${this.baseUrl}subjects/allSubjects`).pipe(
      map((response: any) => {
        return response.subjects.map((disciplina: { _id: any; name: any }) => ({
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

  getAllSubjects(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}subjects/allSubjects`);
  }

  getTopicsByDiscipline(disciplineId: string): Observable<{ value: string; label: string }[]> {
    return this.getAllSubjects().pipe(
      map((response: any) => {
        const disciplina = response.subjects.find((d: { _id: string }) => d._id === disciplineId);
        return disciplina ? disciplina.topics.map((topico: { _id: string; name: string }) => ({
          value: topico._id,
          label: topico.name
        })) : [];
      })
    );
  }
}
