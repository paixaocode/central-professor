import { Component } from '@angular/core';
import { VIDEOS } from './mestre-acao.constants';

@Component({
  selector: 'app-mestre-acao',
  templateUrl: './mestre-acao.component.html',
  styleUrl: './mestre-acao.component.css'
})
export class MestreAcaoComponent {
  videosDicas: Array<any> = VIDEOS.DICAS;

  
}
