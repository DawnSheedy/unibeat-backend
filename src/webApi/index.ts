import { Router } from "express";
import { songApi } from "./songApi";

const webApi = Router()

webApi.use('/songs', songApi)

export { webApi }