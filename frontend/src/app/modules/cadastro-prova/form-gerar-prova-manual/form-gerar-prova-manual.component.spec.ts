import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGerarProvaManualComponent } from './form-gerar-prova-manual.component';

describe('FormGerarProvaManualComponent', () => {
  let component: FormGerarProvaManualComponent;
  let fixture: ComponentFixture<FormGerarProvaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormGerarProvaManualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGerarProvaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
