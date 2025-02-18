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