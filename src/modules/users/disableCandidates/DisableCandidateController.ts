import { Request, Response } from "express";
import { DisableCandidatesService } from "./DisableCandidatesService";

export class DisableCandidateController {
  async handle (request: Request, response: Response) {
    const service = new DisableCandidatesService()

    const qtd = await service.execute()

    return response.status(200).json({
      message: `${qtd} candidatos foram desativados`
    })
  }
}