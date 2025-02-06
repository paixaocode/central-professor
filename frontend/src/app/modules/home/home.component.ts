import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { trigger, style, transition, animate } from '@angular/animations';
import { PoChartOptions, PoChartSerie, PoChartType } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  participationByCountryInWorldExportsType: PoChartType = PoChartType.Line;
  dolar: number | null = null;
  noticias: any[] = [];

  mesAtual: string = '';
  diaAtual: string = '';
  feriados: any[] = [];

  participationByCountryInWorldExports: Array<PoChartSerie> = [
    { label: 'Carol', data: [85, 80, 78, 75, 74, 72], color: 'color-10' },
    { label: 'Leandro', data: [95, 94, 93, 92, 91, 90] },
    { label: 'João', data: [70, 72, 74, 75, 77, 79] },
    { label: 'Tales', data: [50, 52, 55, 60, 63, 65] },
    { label: 'Maria', data: [60, 63, 65, 67, 70, 72] }
  ];
  
  categories: Array<string> = ['7 ano', '8 ano', '9 ano', '1 ano ensino med.', '2 ano ensino med.', '3 ano ensino med.'];

  options: PoChartOptions = {
    axis: {
      minRange: 0,
      maxRange: 40,
      gridLines: 5,
    }
  };

  optionsColumn: PoChartOptions = {
    axis: {
      minRange: -20,
      maxRange: 100,
      gridLines: 7
    }
  };

  constructor(private homeService: HomeService, private route: Router) { }

  ngOnInit(): void {
    this.buscarCotacao();
    this.buscarNoticias();
    this.buscarFeriados();
    this.gerarDataAtual();
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

  gerarDataAtual(): void {
    const hoje = new Date();
    this.mesAtual = hoje.toLocaleString('pt-BR', { month: 'long' }).replace(/^./, (match) => match.toUpperCase());
    this.diaAtual = hoje.getDate().toString().padStart(2, '0');
  }

  buscarFeriados(): void {
    this.homeService.getFeriados().subscribe({
      next: (data) => {
        this.feriados = data.map(feriado => ({
          ...feriado,
          dataFormatada: new Date(feriado.date).toLocaleDateString('pt-BR')
        }));
      },
      error: (err) => console.error('Erro ao buscar feriados:', err)
    });
  }

  abrirGoogleAgenda(feriado: any): void {
    const data = new Date(feriado.date);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
    const dia = data.getDate().toString().padStart(2, '0'); 
  
    const dataFormatada = `${ano}${mes}${dia}T000000Z`;
  
    const googleAgendaUrl = `https://www.google.com/calendar/render?action=TEMPLATE&dates=${dataFormatada}/${dataFormatada}&text=${encodeURIComponent(feriado.name)}`;
  
    window.open(googleAgendaUrl, '_blank');
  }

  abrirGoogleAgendaDia(dia: string): void {
    const hoje = new Date();
    const data = new Date(hoje.getFullYear(), hoje.getMonth(), parseInt(dia));
    const ano = data.getUTCFullYear();
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0'); 
    const diaFormatado = data.getUTCDate().toString().padStart(2, '0');
    
    const hora = '09';
    const minuto = '00';
    const segundo = '00';
  
    const dataInicio = `${ano}${mes}${diaFormatado}T${hora}${minuto}${segundo}Z`;
    const dataFim = `${ano}${mes}${diaFormatado}T${hora}${minuto}${segundo}Z`;
    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Evento&dates=${dataInicio}/${dataFim}`;
    window.open(url, '_blank');
  }

  verMaisClick(event : any){
    this.route.navigate(['ops']);
  }
  
}
