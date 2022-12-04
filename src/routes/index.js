const { Router } = require('express');
// Importar todos los routers;
const pokemon = require('./Pokemon.js');
const type = require('./Type.js');


const router = Router();

// Configurar los routers
router.use('/pokemon', pokemon);
router.use('/type', type);



module.exports = router;
