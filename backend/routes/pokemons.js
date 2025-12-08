const express = require("express");
const router = express.Router();
const Pokemon = require("../models/pokemons");

// Get ALL
router.get("/", async (req, res)=>{
    try {
        const pokemons = await Pokemon.find();
        res.json({data : pokemons})
    } catch(err){
        res.status(500).json({data : err.message})
    }
})

// Get One By Id
router.get("/:id", (req, res)=>{
    req.params.id
})

// Create One
router.post("/", (req, res)=>{

})

// Update One
router.patch("/:id", (req, res)=>{
    
})

// Delete One
router.delete("/:id", (req, res)=>{
    
})

module.exports = router;