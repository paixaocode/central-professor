import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGerarQuestaoComponent } from './form-gerar-questao.component';

describe('FormGerarQuestaoComponent', () => {
  let component: FormGerarQuestaoComponent;
  let fixture: ComponentFixture<FormGerarQuestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormGerarQuestaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGerarQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
