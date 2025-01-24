import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  constructor(private location: Location) { }

  ngOnInit() {
    const navigation = this.location.getState() as FormDataState;
    if (navigation) {
      this.formData = navigation.formData;
      this.isGerarProvaIA = navigation.isGerarProvaIA;
    }
  }
}
