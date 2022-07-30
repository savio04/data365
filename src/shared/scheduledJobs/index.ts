import Agendajs from 'agenda';
import { GetProfileData } from './jobs/getProfileData';

type InitParams = {
  mongoURI: string;
  collection: string;
}

export default class JobScheduler {
  static async init({ mongoURI, collection }: InitParams) {
    const agendajs = new Agendajs({
      db: {
        address: mongoURI,
        collection
      }
    });

    await agendajs._ready;

    try {
      const indexExists = await agendajs._collection.indexExists('findAndLockNextJobIndex');

      if(!indexExists) {
        await agendajs._collection.createIndex({
          disabled: 1,
          lockedAt: 1,
          name: 1,
          nextRunAt: 1,
          priority: -1
        }, {
            name: 'findAndLockNextJobIndex'
          });
      }
    } catch (err) {
      console.log('Failed to create agendajs index!', err);
      throw err;
    }

    // Jobs
    agendajs.define('get data for profile', new GetProfileData().handler);

    await agendajs.start();

    await agendajs.every('5 minutes', 'get data for profile', { timezone: 'America/Sao_Paulo' });

    return agendajs;
  }
}