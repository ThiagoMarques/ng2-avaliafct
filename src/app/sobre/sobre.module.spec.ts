import { SobreModule } from './sobre.module';

describe('CadastroBaseModule', () => {
  let sobreModule: SobreModule;

  beforeEach(() => {
    sobreModule = new SobreModule();
  });

  it('should create an instance', () => {
    expect(sobreModule).toBeTruthy();
  });
});
