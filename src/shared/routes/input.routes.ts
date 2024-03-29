import { ImportProfilesController } from "@modules/profiles/useCases/importProfiles/ImportProfilesController";
import { Router } from "express";
import multer from 'multer';

const upload = multer()
export const inputRoutes = Router()

const importProfilesController = new ImportProfilesController()

inputRoutes.post('/', upload.single('file'), importProfilesController.handle)