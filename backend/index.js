require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connection

const app = express();

app.use(express.json());

const pokemonRouter = require("./routes/pokemons");


app.get("/", (req, res) => {
    res.send("App Is Running Perfectly");
})

mongoose.connect(process.env.DATABASE_URL);

db.on("error", (error)=>{
    console.error("Database connection error:", error)
})

db.once("open", ()=>{
    console.log("Connected To Database")
    app.use("/pokemons", pokemonRouter);
    
    app.listen(3000, ()=>{
        console.log(`Server Is Running On : http://localhost:3000/`);
    });
});