import { Router } from "express"

const loginRouter = Router()

type session = {
  email: string
}

loginRouter.get("/", (req, res, next) => {
  if (req.session!.email) {
    res.redirect("/")
  } else {
    req.session!.email = "hoge@example.com"
  }
  next()
})

loginRouter.post("/", (req, res, next) => {
  req.session!.email = "hoge@example.com"
})

export default loginRouter
