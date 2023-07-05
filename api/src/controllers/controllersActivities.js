const { Country, Activity } = require('../db');

const controllerCreateActivity = async (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  const existingActivity = await Activity.findOne({ where: { name } });
  if (existingActivity) {
    throw new Error("The activity already exists");
  }
  if (!countries || countries.length === 0) {
    throw new Error("The activity must have at least one country");
  }
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  await newActivity.setCountries(countries);
  return newActivity;
};

const getAllActivities = async () => {
  const allActivities = await Activity.findAll({ 
    include: { 
      model: Country, 
      attributes : ['id', 'name'],
      through: {
        attributes: [],
      },
    }});
  return allActivities;
};

module.exports = {
  controllerCreateActivity,
  getAllActivities,
};