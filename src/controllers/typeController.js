const getTypes = (data) => { 
    const types = [];
    data.results.forEach((el) => types.push({name: el.name}));
    return types;
};

module.exports = { getTypes }