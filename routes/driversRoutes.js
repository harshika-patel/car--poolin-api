import express from 'express';
const router = express.Router();
import { getDriverList ,registerDriver} from '../controllers/driversController.js';
//ROUTES
router.get("/", getDriverList);
 router.post("/",registerDriver); 


// Export the router so that the app can access it from the server.js file
export default router;