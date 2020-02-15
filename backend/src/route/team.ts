import { Router } from "express"

const teamRouter = Router()

teamRouter.get("/about", (req, res, next) => {
  console.log("/team/about")
})

export default teamRouter
