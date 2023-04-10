import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertiesCards from "./components/PropertiesCards";
import Modal from "./components/Modal";
import ModalView from "./components/ModalView";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/loading";

const App = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [mode, setMode] = useState("create");
  const [form, setForm] = useState({
    area: "",
    bath: "",
    description: "",
    favorite: false,
    img: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    propertyType: "",
    purpose: "",
    rooms: "",
    user_id: "",
  });
  console.log("form", form);
  const [isFavorite, setIsFavorite] = useState(form.favorite);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    getUserData(); //users section
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/properties");
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/properties", {
        ...form,
        user_id: form.user_id,
      });

      if (response.status === 201 || response.status === 200) {
        setOpenModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3001/properties/" + form._id,
        form
      );
      if (response.status === 200) {
        setOpenModal(false);
        getData();

        // actualiza el valor de form.favorite en el estado
        setIsFavorite(form.favorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this?"
      );
      if (confirmation) {
        const response = await axios.delete(
          "http://localhost:3001/properties/" + form._id
        );
        if (response.status === 200) {
          setOpenModalView(false);
          getData();
          // actualiza el valor de form.favorite en el estado
          setIsFavorite(form.favorite);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      const response = await axios.put(
        "http://localhost:3001/properties/" + form._id,
        { favorite: !isFavorite }
      );
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  //users section
  const [usersData, setUsersData] = useState();

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsersData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //end users section

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <div className="container">
        {openModal && (
          <Modal
            form={form}
            setForm={setForm}
            mode={mode}
            setOpenModal={setOpenModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            usersData={usersData} // user section
          />
        )}
        {openModalView && (
          <ModalView
            form={form}
            setForm={setForm}
            setOpenModalView={setOpenModalView}
            handleDelete={handleDelete}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
        )}
        <PropertiesCards
          data={data}
          setOpenModal={setOpenModal}
          setForm={setForm}
          setMode={setMode}
          setOpenModalView={setOpenModalView}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <Footer />
    </>
  );
};

export default App;
