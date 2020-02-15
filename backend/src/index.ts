require("dotenv").config()
import express from "express"
import path from "path"
import teamRouter from "./route/team"

const app = express()

app.use(express.static(path.resolve("./", "../frontend/dist")))
app.use("/teams", teamRouter)

app.get("*", (req, res, next) => {
  res.sendFile(path.resolve("./", "../frontend/dist/index.html"))
})

app.listen(3000, () => {
  console.log("server up")
  console.log("http://localhost:3000")
})
