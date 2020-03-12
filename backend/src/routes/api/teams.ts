import { Router } from "express"
import { UserSession } from "../../utils/types"

const teamRouter = Router()

teamRouter.get("/", (req, res, next) => {
  const session = req.session as UserSession
  if (session.user) {
    res.send({ team: "" })
  } else {
    res.sendStatus(401)
  }
})

export default teamRouter

// TODO: API の完成
