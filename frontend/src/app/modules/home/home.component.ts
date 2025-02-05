import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  dolar: number | null = null;
  noticias: any[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.buscarCotacao();
    this.buscarNoticias();
    setInterval(() => this.buscarCotacao(), 300000);
  }

  buscarCotacao(): void {
    this.homeService.getCotacaoDolar().subscribe({
      next: (valor) => this.dolar = valor,
      error: (err) => console.error('Erro ao buscar cotação:', err)
    });
  }

  buscarNoticias(): void {
    this.homeService.getNoticias().subscribe({
      next: (data) => this.noticias = data.length ? data : [{ title: 'Nenhuma notícia disponível no momento.', url: '#' }],
      error: (err) => console.error('Erro ao buscar notícias:', err)
    });
  }
}
