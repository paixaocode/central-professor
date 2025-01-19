import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProvaComponent } from './cadastro-prova.component';

describe('CadastroProvaComponent', () => {
  let component: CadastroProvaComponent;
  let fixture: ComponentFixture<CadastroProvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroProvaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
