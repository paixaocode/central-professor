import { Component } from '@angular/core';

@Component({
  selector: 'app-ops',
  templateUrl: './ops.component.html',
  styleUrl: './ops.component.css'
})
export class OpsComponent {

  voltar(){
    window.history.back();
  }

}
