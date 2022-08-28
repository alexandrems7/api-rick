require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database/database")
// const userRoute = require("./users/users.route")
// const authRoute = require("./auth/auth.route")



const port = process.env.PORT || 3002;
const app = express();

connectDatabase();
app.use(cors());

app.use(express.json());


// app.use("/users", userRoute)
// app.use("/auth", authRoute)

app.get('/', (req, res) => {
    res.send({message: "Oi"})
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))