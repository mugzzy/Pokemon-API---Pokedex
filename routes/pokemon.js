const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const API_URL = process.env.API_URL;

router.get("/", async(req, res) => {
    try {
        const response = await axios.get(`${API_URL}?limit=20`);
        const data = response.data;
        return res.render("pages/home",{pokemonList: response.data.results});
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/pokemon/:name", async(req,res) => {
try {
    const { name } = req.params;
    const response = await axios.get(`${API_URL}/${name}`);
    return res.render("pages/details", { pokemon: response.data });
} catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "Internal server error",
    });
}
});

router.get("/search", async(req, res) => {
    try {
        const { name } = req.query;
        if(!name) return res.redirect("/");
        const response = await axios.get(`${API_URL}/${name.toLowerCase()}`);
        return res.render("pages/details", { pokemon: response.data });
    } catch (error) {
         console.error(error);
    return res.status(500).json({
        message: "Internal server error",
    });
    }
});   

module.exports = router;    