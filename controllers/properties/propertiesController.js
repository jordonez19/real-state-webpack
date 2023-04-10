const Properties = require("../../models/Properties");
const Users = require("../../models/Users");

const getAllProperties = async (req, res) => {
  try {
    const properties = await Properties.find().populate({
      path: "user_id",
      select: "_id name",
    });

    res.json(properties);
  } catch (error) {
    console.log("get", error);
  }
};

const createProperty = async (req, res) => {
  const property = new Properties({
    propertyType: req.body.propertyType,
    img: req.body.img,
    bath: req.body.bath,
    description: req.body.description,
    purpose: req.body.purpose,
    favorite: req.body.favorite,
    area: req.body.area,
    rooms: req.body.rooms,
    user_id: req.body.user_id,
  });
  try {
    const newProperty = await property.save();

    const user = await Users.findByIdAndUpdate(
      req.body.user_id,
      { $push: { properties: newProperty._id } },
      { new: true }
    );

    res.json(newProperty);
  } catch (error) {
    console.log("post", error);
  }
};

const getPropertyById = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Properties.findById(id);

    res.json(property);
  } catch (error) {
    console.log("get", error);
  }
};

const updateProperty = async (req, res) => {
  const id = req.params.id;

  const { user_id, ...updates } = req.body;

  try {
    // Obtener la propiedad original para verificar si se cambió el usuario asignado
    const originalProperty = await Properties.findById(id);

    if (user_id && user_id.toString() !== originalProperty.user_id.toString()) {
      // Si se cambió el usuario asignado, actualizar las propiedades de los usuarios
      await Users.findByIdAndUpdate(originalProperty.user_id, {
        $pull: { properties: id },
      });

      const updatedProperty = await Properties.findByIdAndUpdate(
        id,
        {
          ...updates,
          user_id,
        },
        { new: true }
      );

      await Users.findByIdAndUpdate(user_id, {
        $push: { properties: id },
      });

      res.json(updatedProperty);
    } else {
      // Si no se cambió el usuario asignado, simplemente actualizar la propiedad
      const updatedProperty = await Properties.findByIdAndUpdate(id, updates, {
        new: true,
      });

      await Users.findByIdAndUpdate(originalProperty.user_id, {
        $pull: { properties: id },
      });

      await Users.findByIdAndUpdate(originalProperty.user_id, {
        $push: { properties: id },
      });

      res.json(updatedProperty);
    }
  } catch (error) {
    console.log("put", error);
  }
};

const deleteProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProperty = await Properties.findByIdAndDelete(id);

    // Elimina la referencia a la propiedad en todos los usuarios que la tenían asignada
    await Users.updateMany({ properties: id }, { $pull: { properties: id } });

    res.json(deletedProperty);
  } catch (error) {
    console.log("delete", error);
  }
};

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
