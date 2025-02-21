import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
import passengersRoutes from "./routes/passengersRoutes.js";
import driversRoutes from "./routes/driversRoutes.js";
import ridesRoutes from './routes/ridesRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
const PORT = process.env.PORT;


app.use(cors());

app.use(express.json());


app.use("/passengers", passengersRoutes)
app.use("/drivers", driversRoutes)
app.use("/rides",ridesRoutes);
app.use("/login",loginRoutes);

app.get("/", (req, res) => {
  res.send("working");
});
 


app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
  });