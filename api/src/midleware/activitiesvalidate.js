const { Country } = require('../db');

const validatePostActivity = async (req, res, next) => {
  try {
    const { name, difficulty, duration, season, countries} = req.body;
    if (!name) 
      throw new Error('Name does not exist');
    if (!req.body.hasOwnProperty('difficulty')) 
      throw new Error('Dificult does not exist');
    if (difficulty < 1 || difficulty > 5) 
      throw new Error('The range of difficulty must be between 1 and 5');
    if (req.body.hasOwnProperty('duration') && duration < 0) 
      throw new Error('Duration does not exist');
    if (!req.body.hasOwnProperty('season')) 
      throw new Error('season does not exist');
    if (!['Summer', 'Autumn', 'Winter', 'Spring'].includes(season)) 
      throw new Error('The season must be any of Summer, Autumn, Winter, Spring');
    if (!req.body.hasOwnProperty('countries')) 
      throw new Error('Countries does not exist');
    if (countries.length < 1) 
      throw new Error('Countries is empty');
    let countryFound;
    for (let i = 0; i < countries.length; i++) {
      countryFound = await Country.findByPk(countries[i]);
      if (!countryFound) 
        throw new Error('Country not found in database');
    }
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  validatePostActivity,
};