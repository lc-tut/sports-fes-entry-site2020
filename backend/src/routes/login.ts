import { Router } from "express"
import { UserSession } from "../utils/types"

const loginRouter = Router()

loginRouter.post("/_create", (req, res, next) => {
  const session = req.session as UserSession
  session.user = req.body
  res.send({ status: "ok" })
})

loginRouter.post("/_session", (req, res, next) => {
  const session = req.session as UserSession
  if (session.user) {
    res.send(session.user)
  } else {
    res.json(null)
  }
})

loginRouter.post("/_destroy", (req, res, next) => {
  // TODO: ログアウト処理
  req.session!.destroy(err => {
    console.log(err)
  })
})

export default loginRouter
