import React from "react";

const ModalView = ({
  form,
  setOpenModalView,
  handleDelete,
  toggleFavorite,
  isFavorite,
  setForm,
}) => {
  const handleModalClose = () => {
    setOpenModalView(false);
    setForm({
      area: "",
      bath: "1",
      description: "",
      favorite: false,
      img: "",
      propertyType: "",
      purpose: "",
      rooms: "",
    });
  };

  return (
    <>
      <div className="overlay">
        <div className="modal flex">
          <div>
            <div className="form-title-container">
              <h3>Property Type {form.propertyType}: </h3>
              <div className="right-v dop ">
                <span onClick={() => { handleModalClose()}}>X</span>
              </div>
            </div>
            <div>
              <img
                src={
                  form.img === ""
                    ? "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    : form.img
                }
                alt="image of the property"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="modalView-description">
            <div className="right-v dav">
              <span onClick={() => setOpenModalView(false)}>X</span>
            </div>
            <p>
              <b>Description:</b>
              {form.description}
            </p>
            <p>
              <b>Area:</b> {form.area}
            </p>
            <p>
              <b>Rooms:</b> {form.rooms}
            </p>
            <p>
              <b>Bathrooms:</b> {form.bath}
            </p>
            <p>
              <b>Property type:</b> {form.propertyType}
            </p>
            <p>
              <b>Purpose:</b> {form.purpose}
            </p>
            <p>
              <b>Image URL: </b>
              {form.img}
            </p>
            <div className="flex modalview-buttons">
              <button
                onClick={() => {
                  toggleFavorite();
                }}
              >
                {isFavorite ? "Remove Favorite" : "Add Favorite"}
              </button>
              <button className="red" onClick={() => handleDelete()}>
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalView;
