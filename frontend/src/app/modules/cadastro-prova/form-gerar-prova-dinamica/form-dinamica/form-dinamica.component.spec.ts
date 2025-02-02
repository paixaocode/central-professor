import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDinamicaComponent } from './form-dinamica.component';

describe('FormDinamicaComponent', () => {
  let component: FormDinamicaComponent;
  let fixture: ComponentFixture<FormDinamicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDinamicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
