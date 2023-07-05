const {Router} = require('express');
const { handlerCountries, handlerCountryById } = require('../handlers/handlersContries');
const { validateIdCountry, validateNameCountry } = require('../midleware/countriesValidate');

const countriesRouter = Router();

countriesRouter.get('/', validateNameCountry, handlerCountries);
countriesRouter.get('/:idPais', validateIdCountry, handlerCountryById);

module.exports = countriesRouter;