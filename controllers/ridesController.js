import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);


export const getRidesList = async (req, res) => {
  try {
    const rides = await knex("rides")
      .select(
        "rides.id",
        "rides.from",
        "rides.to",
        "rides.date",
        "rides.time",
        "rides.price",
        "rides.seats",
        "drivers.username",
        "drivers.phone_number"
      )
      .join("drivers", "rides.driver_id", "drivers.id"); // Ensure driver_id is present in rides table

    res.json(rides);
  } catch (err) {
    console.error('Error getting rides:', err);
    res.status(500).json({ message: "Error getting rides", error: err });
  }
};

// Register a new ride
export const registerRide = async (req, res) => {
  const { from, to, date, time, price, seats } = req.body;

  try {
    await knex("rides").insert({
      from,
      to,
      date,
      time,
      price,
      seats,
    });
    res.status(201).json({ message: "Ride registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering ride", error: err });
  }
};
