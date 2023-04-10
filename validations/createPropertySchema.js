const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: "empty",
  strictTuples: true,
});

const Validator = require("validator");

require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

const createPropertyValidator = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      propertyType: { type: "string" },
      img: { type: "string" },
      bath: { type: "number" },
      description: { type: "string" },
      purpose: { type: "string" },
      favorite: { type: "boolean" },
      area: { type: "number" },
      rooms: { type: "number" },
      user_id: { type: "string" }
    },
    required: [
      "propertyType",
      "description",
      "purpose",
      "area",
      "rooms",
      "bath",
    ],
    additionalProperties: false,
  };
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (!valid) {
    const errors = validate.errors.map((error) => error.message);
    res.render('formulario', { errors, formData: req.body });
  } else {
    next();
  }
}

module.exports = createPropertyValidator;
