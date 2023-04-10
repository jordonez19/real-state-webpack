import React from "react";

const Modal = ({
  form,
  setForm,
  mode,
  setOpenModal,
  handleChange,
  handleSubmit,
  handleEdit,
  usersData,
}) => {
  const isEdit = mode === "edit";
  const handleModalClose = () => {
    setOpenModal(false);
    setForm({
      area: "",
      bath: "",
      description: "",
      favorite: false,
      img: "",
      propertyType: "",
      purpose: "",
      rooms: "",
    });
  };
  const options = ["Apartment", "House", "Condo"];

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>{isEdit ? "Edit property" : "Create new property"}</h3>
            <span onClick={handleModalClose}>X</span>
          </div>
          <div>
            <p>
              All fields with <b className="required">*</b> are required
            </p>
          </div>
          <form onSubmit={isEdit ? handleEdit : handleSubmit}>
            <label htmlFor="propertyType">
              Property<b className="required">*</b>
              <select
                id="propertyType"
                name="propertyType"
                value={form && form.propertyType}
                onChange={handleChange}
                required
              >
                <option value={form.propertyType}>{form.propertyType}</option>
                {options
                  .filter((option) => option !== form.propertyType)
                  .map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </label>
            <br />
            <label htmlFor="area">
              Area <b className="required">*</b>
              <input
                type="text"
                id="area"
                name="area"
                value={form && form.area}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label htmlFor="rooms">
              Rooms <b className="required">*</b>
              <select
                id="rooms"
                name="rooms"
                value={form && form.rooms}
                onChange={handleChange}
              >
                <option value=""> </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </label>
            <br />
            <label htmlFor="bath">
              Bathrooms <b className="required">*</b>
              <select
                id="bath"
                name="bath"
                value={form && form.bath}
                onChange={handleChange}
              >
                <option value=""> </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </label>
            <br />

            <label htmlFor="user_id">
              Assigner <b className="required">*</b>
              <select
                id="user_id"
                name="user_id"
                value={form && form.user_id}
                onChange={handleChange}
              >
                {!isEdit ? (
                  <>
                    <option value=""> </option>
                    {usersData.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                        defaultValue={form && form.user_id === item._id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {usersData.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                        defaultValue={form && form.user_id === item._id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </label>

            <label htmlFor="purpose">
              Purpose <b className="required">*</b>
              <select
                id="purpose"
                name="purpose"
                value={form && form.purpose}
                onChange={handleChange}
                required
              >
                {isEdit ? (
                  <>
                    {form.purpose === "Rent" || form.purpose === "rent" ? (
                      <>
                        <option value="Rent" defaultValue>
                          Rent
                        </option>
                        <option value="Sell">Sell</option>
                      </>
                    ) : (
                      <>
                        <option value="Sell" defaultValue>
                          Sell
                        </option>
                        <option value="Rent">Rent</option>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <option value=""> </option>
                    {form.purpose === "Rent" || form.purpose === "rent" ? (
                      <>
                        <option value="Rent" defaultValue>
                          Rent
                        </option>
                        <option value="Sell">Sell</option>
                      </>
                    ) : (
                      <>
                        <option value="Sell" defaultValue>
                          Sell
                        </option>
                        <option value="Rent">Rent</option>
                      </>
                    )}
                  </>
                )}
              </select>
            </label>
            <br />
            <label htmlFor="description">
              Description <b className="required">*</b>
              <input
                id="description"
                name="description"
                value={form && form.description}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label htmlFor="img">
              Image URL:
              <input
                type="url"
                id="img"
                name="img"
                value={form.img}
                onChange={handleChange}
              />
            </label>
            <br />
            <button className="form-submit-btn" type="submit">
              {isEdit ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
