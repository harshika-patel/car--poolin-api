import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check in passengers table
        const passenger = await knex("passengers").where({ username, password }).first();
        if (passenger) {
            return res.status(200).json({ message: "Login successful!", role: "passenger" });
        }

        // Check in drivers table
        const driver = await knex("drivers").where({ username, password }).first();
        if (driver) {
            return res.status(200).json({ message: "Login successful!", role: "driver" });
        }

        // If no match found
        return res.status(401).json({ message: "Invalid username or password." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error during login", error: err });
    }
};
