import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check in user_logins table
        const user = await knex("user_logins").where({ username, password }).first();
        if (user) {
            return res.status(200).json({
                message: "Login successful!",
                role: user.role, // Return the role of the user (driver or passenger)
                user_id: user.user_id // Optionally return the user ID for further use
            });
        }

        // If no match found
        return res.status(401).json({ message: "Invalid username or password." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error during login", error: err });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        // Fetch all data from user_logins table
        const users = await knex("user_logins").select("*"); // Select all columns
        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving user data", error: err });
    }
};