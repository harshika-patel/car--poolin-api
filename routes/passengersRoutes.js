import express from 'express';
import { registerPassenger,getPassengersList } from '../controllers/passengersController.js';
const router = express.Router();

//ROUTES
router.get('/',getPassengersList);
router.post('/', registerPassenger);

// Export the router so that the app can access it from the server.js file
export default router;