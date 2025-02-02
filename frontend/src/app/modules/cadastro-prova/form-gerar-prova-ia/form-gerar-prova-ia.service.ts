import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { InformacoesProvaService } from 'src/app/services/informacoesProva.service';

@Injectable({
  providedIn: 'root'
})
export class FormGerarProvaIaService {

  constructor(
    private informacoesProvaService: InformacoesProvaService
  ) { }


  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();

  private formValidSubject = new BehaviorSubject<boolean>(false);
  formValid$ = this.formValidSubject.asObservable();

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
}
