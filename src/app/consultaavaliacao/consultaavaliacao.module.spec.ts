import { ConsultaAvaliacaoModule } from './consultaavaliacao.module';

describe('ConsultaAvaliacaoModule', () => {
  let consultaavaliacaoModule: ConsultaAvaliacaoModule;

  beforeEach(() => {
    consultaavaliacaoModule = new ConsultaAvaliacaoModule();
  });

  it('should create an instance', () => {
    expect(consultaavaliacaoModule).toBeTruthy();
  });
});

