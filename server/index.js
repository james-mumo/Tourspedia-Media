import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import userRouter from "./routes/user.js"

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use("/users", userRouter)

const MONGODB_URL = "mongodb://0.0.0.0:27017/tourpedia"
const port = 4000

app.get("/", (req, res) => {
  res.json("hey james")
})

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.log(`${error} did not run`))
