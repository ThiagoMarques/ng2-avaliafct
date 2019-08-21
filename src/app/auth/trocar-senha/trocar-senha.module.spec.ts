import { TrocarSenhaModule } from './trocar-senha.module';

describe('TrocaSenhaModule', () => {
  let trocarSenhaModule: TrocarSenhaModule;

  beforeEach(() => {
    trocarSenhaModule = new TrocarSenhaModule();
  });

  it('should create an instance', () => {
    expect(trocarSenhaModule).toBeTruthy();
  });
});
