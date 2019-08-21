import { CriarUmaContaModule } from './criar-uma-conta.module';

describe('CriarUmaContaModule', () => {
  let criarUmaContaModule: CriarUmaContaModule;

  beforeEach(() => {
    criarUmaContaModule = new CriarUmaContaModule();
  });

  it('should create an instance', () => {
    expect(criarUmaContaModule).toBeTruthy();
  });
});
