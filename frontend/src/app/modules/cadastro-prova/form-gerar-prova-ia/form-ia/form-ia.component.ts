import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-ia',
  templateUrl: './form-ia.component.html',
  styleUrl: './form-ia.component.css'
})
export class FormIaComponent {
  @Input() formData: any;
  @Input() isGerarProvaIA: boolean = false;
}
