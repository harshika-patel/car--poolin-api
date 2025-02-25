import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
export const getDriverList=async(req,res)=>{
    try {
    const driverList=await knex.select("*").from("drivers");
    res.json(driverList);
    }catch (err) {
        console.log(err);
        // res.status(400).send("Error getting inventory: ", err);
      }
}

export const registerDriver = async (req, res) => {
  const { username, password, age, phone_number, car_name, model, color, license_plate_number } = req.body;

  try {
    // Check if driver already exists
    const existingDriver = await knex("drivers")
      .where("username", username)
      .orWhere("phone_number", phone_number)
      .orWhere("license_plate_number", license_plate_number)
      .first();

    if (existingDriver) {
      return res.status(400).json({ message: "Driver already registered! You can log in if you want." });
    }

    // Insert new driver into the database
    const [userId] = await knex("drivers")
    .insert({
      username,
      password, // Consider hashing the password before storing it
      age,
      phone_number,
      car_name,
      model,
      color,
      license_plate_number,
    }, 'id'); 
    await knex("user_logins").insert({
      username,
      password,
      user_id: userId, // Use the ID from drivers table
      role: "driver" // Since this function is for drivers
  });

    res.status(201).json({ message: "Driver registered successfully!" });
  } catch (err) {
    console.error('Error registering driver:', err);
    res.status(500).json({ message: "Error registering driver", error: err });
  }
};