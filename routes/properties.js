const express = require("express");
const router = express.Router();
const PropertiesController = require("../controllers/properties/propertiesController");
const createPropertyValidator = require("../validations/createPropertySchema");

router.get("/", PropertiesController.getAllProperties);
router.post("/", createPropertyValidator, PropertiesController.createProperty);
router.get("/:id", PropertiesController.getPropertyById);
router.put("/:id", PropertiesController.updateProperty);
router.delete("/:id", PropertiesController.deleteProperty);

module.exports = router;


