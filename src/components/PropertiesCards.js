import React, { useState } from "react";

const PropertiesCards = ({
  data,
  setOpenModal,
  setMode,
  setForm,
  setOpenModalView,
  searchTerm,
  setSearchTerm,
}) => {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredData = data.filter((item) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const isFavorite = item.favorite && showFavoritesOnly;
    return (
      (item.propertyType.toLowerCase().includes(searchTermLowerCase) ||
        item.purpose.toLowerCase().includes(searchTermLowerCase) ||
        item.description.toLowerCase().includes(searchTermLowerCase) ||
        item.rooms.toString().includes(searchTermLowerCase) ||
        item.bath.toString().includes(searchTermLowerCase) ||
        item.area.toString().includes(searchTermLowerCase)) &&
      (!showFavoritesOnly ? true : isFavorite)
    );
  });

  return (
    <>
      <div className="flex-right">
        <div>
          <button
            style={{ margin: "-12px 0 0 10px" }}
            onClick={() => {
              setOpenModal(true);
              setMode("create");
            }}
          >
            Create
          </button>
        </div>
        <div>
          <label htmlFor="show-favorites-only">
            <i
              className={`fa-sharp fa-solid fa-bookmark${
                showFavoritesOnly ? "active" : ""
              }`}
              style={{
                color: "#00b7ef",
                cursor: "pointer",
                margin: " 0 0 0 10px",
              }}
            ></i>
          </label>
          <input
            type="checkbox"
            id="show-favorites-only"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="search-container flex">
        <input
          type="text"
          placeholder="Search property"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid-images">
        {filteredData.map((item) => (
          <div className="card" key={item.id}>
            <img
              src={
                item.img === ""
                  ? "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  : item.img
              }
              alt="image of the property"
              onClick={() => {
                setOpenModalView(true);
                setForm(item);
              }}
            />
            <div className="card-body">
              <h3 className="card-title">
                {item.propertyType} in {item.purpose}
              </h3>
              <p className="card-text">{item.description}</p>
              <p className="card-text">
                <b>Type:</b> {item.propertyType}
              </p>
              <p className="card-text">
                <b>Rooms:</b> {item.rooms}
              </p>
              <p className="card-text">
                <b>Baths:</b> {item.bath}
              </p>
              <p className="card-text">
                <b>Purpose:</b> {item.purpose}
              </p>
              <p className="card-text">
                <b>Area:</b> {item.area}
              </p>
              {!!item.favorite ? (
                <p className="card-text">
                  <b>Favorite: </b>{" "}
                  <i
                    style={{ color: "#00b7ef" }}
                    className="fa-sharp fa-solid fa-bookmark"
                  ></i>
                </p>
              ) : null}
              <div className="cards-flex-buttons">
                <div>
                  {" "}
                  <button
                    onClick={() => {
                      setOpenModalView(true);
                      setForm(item);
                    }}
                  >
                    info
                  </button>{" "}
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setMode("edit");
                      setForm(item);
                    }}
                  >
                    edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PropertiesCards;
