import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { InformacoesProvaService } from 'src/app/services/informacoesProva.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormGerarProvaIaService {

  private apiUrl = `${environment.baseUrlBackEnd}tests/create`;
  
  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();

  private formValidSubject = new BehaviorSubject<boolean>(false);
  formValid$ = this.formValidSubject.asObservable();

  constructor(
    private informacoesProvaService: InformacoesProvaService,
    private http: HttpClient
  ) {}

  setFormData(data: any): void {
    const currentData = this.formDataSubject.value;
    if (JSON.stringify(data) !== JSON.stringify(currentData)) {
      this.formDataSubject.next(data);
    }
  }

  getFormData(): any {
    return this.formDataSubject.value;
  }

  setFormValid(isValid: boolean): void {
    if (isValid !== this.formValidSubject.value) {
      this.formValidSubject.next(isValid);
    }
  }

  getFormValid(): boolean {
    return this.formValidSubject.value;
  }

  resetFormData(): void {
    this.formDataSubject.next(null);
    this.formValidSubject.next(false);
  }

  getDisciplinas(): Observable<{ value: string; label: string }[]> {
    return this.informacoesProvaService.getDisciplinas();
  }

  getGrades(): Observable<{ value: string; label: string }[]> {
    return this.informacoesProvaService.getGrades();
  }

  saveTest(testData: any): Observable<any> {
    return this.http.post(this.apiUrl, testData);
  }

  getTopicsByDiscipline(disciplineId: string): Observable<{ value: string; label: string }[]> {
    return this.informacoesProvaService.getTopicsByDiscipline(disciplineId);
  }
}
