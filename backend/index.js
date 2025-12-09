require("dotenv").config()

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const mongoose = require("mongoose");
const db = mongoose.connection

const Pokemon = require("./api/pokemon/models");
const pokemonRouter = require("./api/pokemon/routes");
const userRouter = require("./api/users/routes");

require("./config/passport")(passport);

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("App Is Running Perfectly");
})


mongoose.connect(process.env.DATABASE_URL);


db.on("error", (error)=>{
    console.error("Database connection error:", error)
})

db.once("open", async ()=>{
    console.log("Connected To Database")
    
    await seedPokemon();
    
    app.use("/pokemons", pokemonRouter);
    app.use("/users", userRouter);
    
    app.listen(3000, ()=>{
        console.log(`Server Is Running On : http://localhost:3000/`);
    });
});


async function seedPokemon() {
    try {
        const count = await Pokemon.countDocuments();
        if (count > 0) {
            console.log(`Database already contains ${count} Pokemon`);
            return;
        }

        console.log("Fetching 151 Pokemon from PokeAPI...");
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();

        console.log("Fetching detailed data for each Pokemon...");
        const pokemonPromises = data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            const detail = await detailResponse.json();

            return {
                id: detail.id,
                name: detail.name,
                types: detail.types.map(t => t.type.name),
                sprite: detail.sprites.front_default,
                height: detail.height,
                weight: detail.weight,
                stats: {
                    hp: detail.stats[0].base_stat,
                    attack: detail.stats[1].base_stat,
                    defense: detail.stats[2].base_stat,
                    specialAttack: detail.stats[3].base_stat,
                    specialDefense: detail.stats[4].base_stat,
                    speed: detail.stats[5].base_stat
                }
            };
        });

        const pokemonData = await Promise.all(pokemonPromises);
        await Pokemon.insertMany(pokemonData);
        console.log(`Successfully seeded ${pokemonData.length} Pokemon!`);
    } catch (error) {
        console.error("Error seeding Pokemon:", error.message);
    }
}