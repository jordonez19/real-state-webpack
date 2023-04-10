const router = require("express").Router({ mergeParams: true });
const propertiesRouter = require("./properties");
const usersRouter = require("./users");

router.get("/", (req, res) => {
  res.send("api/v1/ "); // se coambio el nombre a api/v1/
});

router.use("/properties", propertiesRouter);
router.use("/users", usersRouter);

module.exports = router;