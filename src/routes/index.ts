import { Router } from 'express'
import { inputRoutes } from './input.routes'

export const routes = Router()

routes.use('/input', inputRoutes)