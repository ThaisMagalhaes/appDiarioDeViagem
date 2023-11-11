import { ViagemRepository } from "core/database/repositories";
import { ViagemService } from "core/services";
import { connection } from "core/database";

export function makeViagemService(){
    const viagemRepository = new ViagemRepository(connection)
    const viagemService = new ViagemService(viagemRepository);

    return viagemService;
}