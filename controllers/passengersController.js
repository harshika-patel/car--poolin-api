import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
export const getPassengersList=async(req,res)=>{
    try {
    const passengersList=await knex.select("*").from("passengers");
    res.json(passengersList);
    }catch (err) {
        console.log(err);
        // res.status(400).send("Error getting inventory: ", err);
      }
}
export const registerPassenger = async (req, res) => {
  const { username, password, age, phone_number } = req.body;

  try {
    // Check if the passenger already exists
    const existingPassenger = await knex("passengers")
     
      .where("phone_number", phone_number)
      .first();

    if (existingPassenger) {
      return res.status(400).json({ message: "You are already registered. You can log in if you want." });
    }

    // Insert new passenger
    await knex("passengers").insert({
      username,
      password,
      age,
      phone_number,
    });

    res.status(201).json({ message: "Passenger registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering passenger", error: err });
  }
};
