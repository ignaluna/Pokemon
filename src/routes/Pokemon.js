const { Router, response } = require('express');
const router = Router();
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
require('dotenv').config();
const { getAllPokemons, simplifyType, simplifySearch } = require("../controllers/pokemonController");


router.get("/", async (req, res) => {
    try {
        // Si esta buscando por nombre ingresa acá
        const { name } = req.query;
        if (name) {
            var pokemonNameDb = await Pokemon.findAll({
                where: { name: name },
                include: [
                    {
                        model: Type,
                        through: {
                            attributes: [],
                        }
                    },
                ],
            });
            if (pokemonNameDb[0]) {
                const namePoke = simplifySearch(pokemonNameDb);
                return res.status(200).json(namePoke)
            } else {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonByName = getAllPokemons(data);
            return pokemonByName ? res.status(200).json(pokemonByName) : res.status(404).send({ message: "Not founded" })
        };
    }

        const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40&offset=0");
    const promises = data.results.map(async el => {
        const { data } = await axios.get(`${el.url}`);
        return getAllPokemons(data);
    });

    const pokemons = await Promise.all(promises);

    const rare = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: { attributes: [] }
        }
    });
    const pokemonsDb = simplifyType(rare);
    if (pokemonsDb) {
        const pokemonFinal = pokemons.concat(pokemonsDb)
        res.status(200).send(pokemonFinal);
    } else {
        res.status(200).send(pokemons);
    }

} catch (err) {
    res.send(404, { Mensage: err.message })
}
})
router.get("/:id", async (req, res) => {

    const { id } = req.params;
    try {
        if (isNaN(id)) {
            const bd = await Pokemon.findAll({
                where: { id: id },
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: { attributes: [] }
                }
            });
            const finalBd = simplifySearch(bd);
            return res.status(200).json(finalBd);
        }

        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonId = getAllPokemons(data);

        res.status(200).send(pokemonId)

    } catch (err) {
        res.send(404, { Mensage: err.message })
    }
})


router.post("/", async (req, res) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, types, img } = req.body;

        if (!name || !types || !height || !weight) return res.status(404).send("Faltan datos obligatorios");

        const idimg = Math.floor(Math.random()* (906 - 40) + 40);
        const newPokemon = await Pokemon.create({
            name: name.toLowerCase(),
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            img: img ? img : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idimg}.png`,
        })


        await newPokemon.addType(types)


        res.status(200).send(newPokemon)
    } catch (err) {

        res.status(404).send(err.message)

    }
})

module.exports = router;
