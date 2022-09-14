import { Readable } from "stream";
import readline from "readline";
import { columnNames, PageTypes } from "@shared/utils/constants";
import { Data365Provider } from "@shared/providers/Data365Provider/implemantatios/Data365Provider";
import { UserModel } from "@modules/users/IUserModel";

// interface IRequest {
//   file: Express.Multer.File | undefined;
// }

// interface IMapPageType {
//   [key: string]: string;
// }

// const mapPageType: IMapPageType = {
//   "VICE-GOVERNADORA": PageTypes.ViceGovernador,
//   "DEPUTADA FEDERAL": PageTypes.DeputadoFederal,
//   "DEPUTADA ESTADUAL": PageTypes.DeputadoEstadual,
//   "2° SUPLENTE DE SENADOR": PageTypes.Senador,
//   "Deputada Federal": PageTypes.DeputadoFederal,
//   "Deputada Estadual": PageTypes.DeputadoEstadual,
//   "1º Suplente Senador": PageTypes.Senador,
//   "Governadora": PageTypes.Governador,
//   "DEPUTADO ESTADUAL": PageTypes.DeputadoEstadual,
//   "DEPUTADO FEDERAL": PageTypes.DeputadoFederal,
//   "SENADO": PageTypes.Senador
// }

export class DisableCandidatesService {
  async execute() {
    /**
     * [x] Ler aquivo csv
     * [x] Criar task de atualização para cada perfil
     * [x] Inserir esses canditos no banco se não existir
     */

    const candidates = await UserModel.find({
      userType: 'CANDIDATE', 
      party: { $ne: 'UNIÃO' },
      deleted: false
    })

    await UserModel.updateMany(
      {
        userType: 'CANDIDATE', 
        party: { $ne: 'UNIÃO' },
        deleted: false
      },
      {
        $set: { deleted: true }
      }
    )

    return candidates.length
  }
}
