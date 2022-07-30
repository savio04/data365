import { Request, Response } from "express";
import { ImportProfilesService } from "./ImportProfilesService";

export class ImportProfilesController {
  async handle (request: Request, response: Response) {
    const file = request.file

    const service = new ImportProfilesService()

    await service.execute({ file })

    return response.status(200).json({
      message: 'file success'
    })
  }
}