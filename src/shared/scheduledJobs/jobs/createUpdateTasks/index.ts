// import ProfileModel from "@modules/profiles/IProfileModel";
// import { Data365Provider } from "@shared/providers/Data365Provider/implemantatios/Data365Provider";
// import { Job } from "agenda";

// export class CreateUpdateTasks {
//   public async handler(job: Job, done: () => void): Promise<any> {
//     const profiles = await ProfileModel.find()

//     const data365Provider = new Data365Provider();

//     console.log("Receber atualizações...")

//     for await (const profile of profiles) {
//       try{
//         await data365Provider.createUpdateTask({ username: profile.username })
//       }catch(error) {
//         console.log("error", error)
//       }
//     }
    
//     console.log("Processo para rebecer atualizações finalizado...")

//     done();
//   }
// }