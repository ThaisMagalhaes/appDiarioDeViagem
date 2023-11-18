import { connection } from 'core/database/config';
import { ViagemEntradaRepository } from 'core/database/repositories';
import { ViagemEntradaService } from 'core/services';

export function makeViagemEntradaService() {
  const viagemEntradaRepository = new ViagemEntradaRepository(connection);
  const viagemEntradaService = new ViagemEntradaService(viagemEntradaRepository);

  return viagemEntradaService;
}
