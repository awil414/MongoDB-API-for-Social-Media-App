const router = require("express").Router();
const apiRoutes = require("./api");

// Add the '/api' sub directory prefix to imported api routes
router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.status(404).send("Wrong route!");
});

module.exports = router;
