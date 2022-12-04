const { Router } = require('express');
const router = Router();
const axios = require("axios");
const { Type } = require('../db.js');
require('dotenv').config();
const { getTypes } = require("../controllers/typeController");

router.get("/", async (req, res) => {
    try {

        const types = await Type.findAll();
        if (types.length) return res.status(200).json(types);
        const { data } = await axios.get("https://pokeapi.co/api/v2/type");

        const pokemontypes = getTypes(data);

        const created = await Type.bulkCreate(pokemontypes);

        res.status(200).send(created);

    } catch (err) {

        res.status(404).send(err.message);
    }
});


module.exports = router;
