import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGerarProvaIaComponent } from './form-gerar-prova-ia.component';

describe('FormGerarProvaIaComponent', () => {
  let component: FormGerarProvaIaComponent;
  let fixture: ComponentFixture<FormGerarProvaIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormGerarProvaIaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGerarProvaIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
