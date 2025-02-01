import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000/api'
@Injectable({
  providedIn: 'root'
})
export class FormGerarQuestaoService {

  constructor( private http: HttpClient) { }

  getSubjects() {
    return this.http.get(`${API_URL}/subjects`);
  }

  getGrades() {
    return this.http.get(`${API_URL}/grades`);
  }
}
