import express from 'express';
const router = express.Router();

//ROUTES
router.get("/endpoint1", function (request, response) {
  response.send("User GET Endpoint Reached");
});

router.post("/endpoint1", function (req, res) {
  res.json({ msg: "User POST Endpoint reached" });
});

// Export the router so that the app can access it from the server.js file
export default router;