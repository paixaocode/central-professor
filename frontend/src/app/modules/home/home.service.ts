import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = `${environment.baseUrlCotacaoMoeda}USD`;
  private urlNews = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${environment.newsApiKey}`;


  constructor(private http: HttpClient) { }

  getCotacaoDolar(): Observable<number> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.rates.BRL)
    );
  }

  getNoticias(): Observable<any[]> {
    return this.http.get<{ articles: any[] }>(this.urlNews).pipe(
      map(response => response.articles.slice(0, 5))
    );
  }
}
