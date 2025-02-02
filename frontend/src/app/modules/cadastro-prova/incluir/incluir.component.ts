import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InformacoesProvaService } from 'src/app/services/informacoesProva.service';

interface FormDataState {
  formData: any;
  isGerarProvaIA: boolean;
}

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class IncluirComponent implements OnInit {

  public formData: any;
  public isGerarProvaIA: boolean = false;
  public isVisualizar: boolean = false;
  public tipoGeracaoProva: string = '';
  
  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
    const navigation = this.location.getState() as FormDataState & { tipoGeracaoProva: string };
    if (navigation) {
      this.formData = navigation.formData;
      this.isGerarProvaIA = navigation.isGerarProvaIA;
      this.tipoGeracaoProva = navigation.tipoGeracaoProva || '';
    }
  }
}
