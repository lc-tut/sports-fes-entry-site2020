import { Router } from "express"
import teamRouter from "./teams"

const apiRouter = Router()

apiRouter.use("/teams", teamRouter)

export default apiRouter
