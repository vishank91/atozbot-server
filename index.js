const express = require("express")
const cors = require("cors")
require("dotenv").config()

require("./db-connect")

const Router = require("./Routes/index")
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", Router)

let PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server is Running at http://localhost:8000`))