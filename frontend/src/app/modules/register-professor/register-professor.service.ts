import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterProfessorService {
  private baseUrl = environment.baseUrlBackEnd;

  constructor(private http: HttpClient) {}

  registerProfessor(data: any): Observable<any> {
    const url = `${this.baseUrl}users/register`;
    return this.http.post(url, data);
  }
}
