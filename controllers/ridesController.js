import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// Fetch all rides with driver details
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
        "rides.is_booked",
        "rides.booked_seats",
        "drivers.username",
        "drivers.phone_number"
      )
      .join("drivers", "rides.driver_id", "drivers.id");

    res.json(rides);
  } catch (err) {
    console.error("Error getting rides:", err);
    res.status(500).json({ message: "Error getting rides", error: err });
  }
};

// Fetch a specific ride by ID
export const getRideById = async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await knex("rides")
      .select(
        "rides.id",
        "rides.from",
        "rides.to",
        "rides.date",
        "rides.time",
        "rides.price",
        "rides.seats",
        "rides.is_booked",
        "rides.booked_seats",
        "drivers.username",
        "drivers.phone_number"
      )
      .join("drivers", "rides.driver_id", "drivers.id")
      .where("rides.id", id)
      .first();

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.json(ride);
  } catch (err) {
    console.error("Error getting ride:", err);
    res.status(500).json({ message: "Error getting ride", error: err });
  }
};


export const registerRide = async (req, res) => {
  
  const { from, to, date, time, price, seats,is_booked,booked_seats, driver_id} = req.body;
  
  


  try {
    await knex("rides").insert({
      from,
      to,
      date,
      time,
      price,
      seats,
      is_booked,      
      booked_seats,        
      driver_id,     
    });

    res.status(201).json({ message: "Ride registered successfully!" });
  } catch (err) {
    console.error("Error registering ride:", err);
    res.status(500).json({ message: "Error registering ride", error: err });
  }
};

export const bookRide = async (req, res) => {
  const { id } = req.params;
  const { seatsNeeded } = req.body;

  try {
      // Ensure seatsNeeded is a valid number
      const seatsToBook = parseInt(seatsNeeded, 10);
      if (isNaN(seatsToBook) || seatsToBook <= 0) {
          return res.status(400).json({ message: "Invalid number of seats requested" });
      }

      // Fetch ride details
      const ride = await knex("rides").where({ id }).first();
      if (!ride) return res.status(404).json({ message: "Ride not found" });

      // Calculate available seats
      const availableSeats = ride.seats - ride.booked_seats;
      if (availableSeats < seatsToBook) {
          return res.status(400).json({ message: "Not enough seats available" });
      }

      // Update ride details
      const updatedSeats = ride.booked_seats + seatsToBook;
      const isFullyBooked = updatedSeats === ride.seats;

      await knex("rides")
          .where({ id })
          .update({ 
              booked_seats: updatedSeats, 
              is_booked: isFullyBooked 
          });

      res.json({ 
          message: "Ride booked successfully!", 
          is_booked: isFullyBooked,
          remainingSeats: ride.seats - updatedSeats 
      });
  } catch (err) {
      console.error("Error booking ride:", err);
      res.status(500).json({ message: "Error booking ride", error: err.message });
  }
};

export const cancelRide = async (req, res) => {
  const { id } = req.params;
  const { seatsToCancel } = req.body; // Number of seats to cancel

  try {
      // Validate input
      const seatsToRemove = parseInt(seatsToCancel, 10);
      if (isNaN(seatsToRemove) || seatsToRemove <= 0) {
          return res.status(400).json({ message: "Invalid number of seats to cancel" });
      }

      // Fetch ride details
      const ride = await knex("rides").where({ id }).first();
      if (!ride) return res.status(404).json({ message: "Ride not found" });

      if (ride.booked_seats === 0) {
          return res.status(400).json({ message: "No seats have been booked yet" });
      }

      // Ensure they don't cancel more seats than booked
      if (seatsToRemove > ride.booked_seats) {
          return res.status(400).json({ message: "You cannot cancel more seats than booked" });
      }

      // Update ride details
      const updatedSeats = ride.booked_seats - seatsToRemove;
      const isFullyBooked = updatedSeats === ride.seats;

      await knex("rides")
          .where({ id })
          .update({
              booked_seats: updatedSeats,
              is_booked: isFullyBooked,
          });

      res.json({
          message: `${seatsToRemove} seat(s) canceled successfully!`,
          is_booked: isFullyBooked,
          remainingSeats: ride.seats - updatedSeats,
      });
  } catch (err) {
      console.error("Error canceling ride:", err);
      res.status(500).json({ message: "Error canceling ride", error: err.message });
  }
};


export const getRidesByLocation = async (req, res) => {
  try {
    const { from, to } = req.query;

    let query = knex("rides")
      .select(
        "rides.id",
        "rides.from",
        "rides.to",
        "rides.date",
        "rides.time",
        "rides.price",
        "rides.seats",
        "rides.is_booked",
        "rides.booked_seats",
        "drivers.username",
        "drivers.phone_number"
      )
      .join("drivers", "rides.driver_id", "drivers.id");

    // Apply filters based on "from" and "to" locations
    if (from) query = query.where("rides.from", "like", `%${from}%`);
    if (to) query = query.where("rides.to", "like", `%${to}%`);

    const rides = await query;

   

    res.json(rides);
  } catch (err) {
    console.error("Error fetching rides:", err);
    res.status(500).json({ message: "Error fetching rides", error: err });
  }
};
