import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormGerarProvaIaService {
    
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
}
