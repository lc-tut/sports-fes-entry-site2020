require("dotenv").config()
import express from "express"
import path from "path"
import teamRouter from "./routes/team"
import loginRouter from "./routes/login"
import session, { MemoryStore } from "express-session"
import connect_redis from "connect-redis"
import redis from "redis"
import helmet from "helmet"

const app = express()
const redisStore = connect_redis(session)

const isProduction = process.env.NODE_ENV === "production"

if (isProduction) {
  app.set("trust proxy", 1)
}

app.use(express.static(path.resolve("./", "../frontend/dist")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: "hoge",
  name: "hoge",
  resave: false,
  saveUninitialized: false,
  store: isProduction ? new redisStore({ client: redis.createClient({ host: "redis" }) }) : new MemoryStore(),
  cookie: {
    // TODO: 本番環境では secure: true などの設定
    // secure: isProduction,
    sameSite: "lax",
    maxAge: 1000 * 60 * 10
  }
}))
app.use(helmet())
app.use("/teams", teamRouter)
app.use("/login", loginRouter)

app.get("*", (req, res, next) => {
  res.sendFile(path.resolve("./", "../frontend/dist/index.html"))
})

app.listen(8080, () => {
  console.log("server up")
  console.log("http://localhost:8080")
})

// TODO: https 接続設定・
// TODO: CSRF 対策 (token を使わない方針で)
