import { Component, OnInit } from '@angular/core';
import { VIDEOS } from './mestre-acao.constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mestre-acao',
  templateUrl: './mestre-acao.component.html',
  styleUrl: './mestre-acao.component.css'
})
export class MestreAcaoComponent implements OnInit {
  videosDicas: SafeResourceUrl[] = [];
  videosTreinamentos: SafeResourceUrl[] = [];
  videosTecnologias: SafeResourceUrl[] = []; 

  constructor( private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    this.videosDicas = this.sanitizarVideos(VIDEOS.DICAS);
    this.videosTreinamentos = this.sanitizarVideos(VIDEOS.TREINAMENTOS);
    this.videosTecnologias = this.sanitizarVideos(VIDEOS.TECNOLOGIAS)
  }

  private sanitizarVideos(videos: string[]): SafeResourceUrl[] {
    return videos.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
