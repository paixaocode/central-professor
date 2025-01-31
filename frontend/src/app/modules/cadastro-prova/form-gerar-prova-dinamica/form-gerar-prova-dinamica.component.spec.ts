import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGerarProvaDinamicaComponent } from './form-gerar-prova-dinamica.component';

describe('FormGerarProvaDinamicaComponent', () => {
  let component: FormGerarProvaDinamicaComponent;
  let fixture: ComponentFixture<FormGerarProvaDinamicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormGerarProvaDinamicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGerarProvaDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
