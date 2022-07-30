import { Readable } from 'stream'
import readline from 'readline'
import { columnNames } from 'utils/constants'
import { Data365Provider } from 'providers/Data365Provider/implemantatios/Data365Provider'
import ProfileModel from '@modules/profiles/IProfileModel'

interface IRequest {
  file: Express.Multer.File | undefined
}

export class ImportProfilesService {
  async execute({ file }: IRequest) {
    /**
     * [x] Ler aquivo csv
     * [x] Criar task de atualização para cada perfil
     * [x] Inserir esses canditos no banco se não existir
     */

    if(file) {
      const data365Provider = new Data365Provider()
      const readable = new Readable()
      
      readable.push(file.buffer)
      readable.push(null)
  
      const linesFile = readline.createInterface({
        input: readable
      })

      console.log("Importação em progresso...")

      for await (const line of linesFile) {
        const username = line.split(',')[0]

        if(!columnNames.includes(username)) {
          const newCandidate = {
            username
          }

          try{
            const usernameAlreadyExists = await ProfileModel.findOne({ username })
            
            if(!usernameAlreadyExists) {
              await data365Provider.createUpdateTask({ username })
              await new ProfileModel(newCandidate).save()
            }

          } catch(error) {
            console.log(`Verifique o nome: ${username}, pois ocorreu um erro`)
          }
        }
      }

      console.log("Importação feita com sucesso!")
    }
  }
}