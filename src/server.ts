import 'reflect-metadata';
import 'express-async-errors';
import express from "express";
import { connectDatabase } from "./database";
import JobScheduler from './scheduledJobs';
import { config } from '@config/config';
import { routes } from 'routes';

const app = express()

connectDatabase() //connection database

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

JobScheduler.init({
  mongoURI: config.MONGO_URI,
  collection: 'scheduledJobs'
});

app.post('/test', (request, response) => {
  console.log("request", request.body)

  return response.status(200).json({})
})

app.listen(config.PORT, () => {
  console.log(`Api iniciada na porta ${config.PORT}`)
})