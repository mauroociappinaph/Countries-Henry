const {getAllActivities, controllerCreateActivity} = require('../controllers/controllersActivities');

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  if (!name || !difficulty || !season) {
    return res.status(400).json('Name, difficulty and season are required');
  }
  try {
    const newActivity = await controllerCreateActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );
    res.status(201).send("Activity created successfully");
  } catch (error) {
    if (error.message === "The activity already exists") {
      res.status(409).json(error.message);
    } else if (error.message === "The activity must have at least one country") {
      res.status(400).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
};


const getActivities = async (req, res) => {
  try {
    const activityResult = await getAllActivities();
    if (activityResult.length < 1) throw new Error('Activities not found');
    res.status(200).json(activityResult);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  postActivity,
  getActivities,
};