import { ExemploNgxFormlyModule } from './exemplo-ngx-formly.module';

describe('ExemploNgxFormlyModule', () => {
  let exemploNgxFormlyModule: ExemploNgxFormlyModule;

  beforeEach(() => {
    exemploNgxFormlyModule = new ExemploNgxFormlyModule();
  });

  it('should create an instance', () => {
    expect(exemploNgxFormlyModule).toBeTruthy();
  });
});
