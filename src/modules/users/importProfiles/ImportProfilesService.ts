import { Readable } from "stream";
import readline from "readline";
import { columnNames, PageTypes } from "@shared/utils/constants";
import { Data365Provider } from "@shared/providers/Data365Provider/implemantatios/Data365Provider";
import { UserModel } from "@modules/users/IUserModel";

interface IRequest {
  file: Express.Multer.File | undefined;
}

interface IMapPageType {
  [key: string]: string;
}

const mapPageType: IMapPageType = {
  "VICE-GOVERNADORA": PageTypes.ViceGovernador,
  "DEPUTADA FEDERAL": PageTypes.DeputadoFederal,
  "DEPUTADA ESTADUAL": PageTypes.DeputadoEstadual,
  "2° SUPLENTE DE SENADOR": PageTypes.Senador,
  "Deputada Federal": PageTypes.DeputadoFederal,
  "Deputada Estadual": PageTypes.DeputadoEstadual,
  "1º Suplente Senador": PageTypes.Senador,
  "Governadora": PageTypes.Governador,
  "DEPUTADO ESTADUAL": PageTypes.DeputadoEstadual,
  "DEPUTADO FEDERAL": PageTypes.DeputadoFederal,
  "SENADO": PageTypes.Senador
}

export class ImportProfilesService {
  async execute({ file }: IRequest) {
    /**
     * [x] Ler aquivo csv
     * [x] Criar task de atualização para cada perfil
     * [x] Inserir esses canditos no banco se não existir
     */

    if (file) {
      const data365Provider = new Data365Provider();
      const readable = new Readable();

      readable.push(file.buffer);
      readable.push(null);

      const linesFile = readline.createInterface({
        input: readable,
      });

      console.log("Importação em progresso...");

      for await (const line of linesFile) {
        const [UF, name, username, party, nomeUrna, number, pageType, email, cpf] = line.split(",");

        if (!columnNames.includes(username)) {
          const newCandidate = {
            instagramPage: username,
            realName: name,
            state: UF,
            party,
            nomeUrna,
            number: number !== "NULL" ? number : "",
            email: email !== "NULL" ? email.toLowerCase() : "",
            cpf: cpf !== "NULL" ? cpf: ""
          } as any;

          if(mapPageType[pageType]) {
            newCandidate['pageType'] = mapPageType[pageType]
          }

          try {
            const usernameAlreadyExists = await UserModel.findOne({
              instagramPage: username,
            });

            if (!usernameAlreadyExists) {
              data365Provider.createUpdateTask({ username });
              await new UserModel(newCandidate).save();
            }
          } catch (error) {
            console.log("error", error);
            console.log(`Verifique o nome: ${username}, pois ocorreu um erro`);
          }
        }
      }

      console.log("Importação feita com sucesso!");
    }
  }
}
