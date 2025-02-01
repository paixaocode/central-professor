import { TestBed } from '@angular/core/testing';

import { FormGerarQuestaoService } from './form-gerar-questao.service';

describe('FormGerarQuestaoService', () => {
  let service: FormGerarQuestaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormGerarQuestaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
