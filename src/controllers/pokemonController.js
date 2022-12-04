const getAllPokemons = (data) => {
    const newPokemon = {
        idApi: data.id,
        name: data.name,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        img: data.sprites.other["official-artwork"].front_default,
        types: data.types.map(el => el.type.name)
    };
    return newPokemon;
};

const simplifyType = (data) => {


    const final = data.map(el => {
        const array = [];
        el.dataValues.types.map(el => array.push(el.name))

        return { ...el.dataValues, types: array }
    })

    return final;
};

const simplifySearch = (data) => {
    const pokemon = data[0].dataValues
    console.log(pokemon)
    const array = [];
    pokemon.types.map(el => {
        array.push(el.name)
    })

    return {...pokemon, types: array};
    
};

module.exports = { simplifySearch, getAllPokemons, simplifyType }