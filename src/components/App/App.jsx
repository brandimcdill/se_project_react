import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../App/App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Footer from "../../components/Footer/Footer";
import Profile from "../Profile/Profile";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  _checkresponse,
  _request,
  addNewItem,
  deleteItem,
} from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";
import ClothesSection from "../ClothesSection/ClothesSection";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleCardDelete = (_id) => {
    deleteItem(_id)
      .then((data) => {
        console.log("Delete ID received:", _id);
        console.log("Type of _id:", typeof _id);
        console.log("Delete response:", data);
        const updatedItems = clothingItems.filter((item) => item._id !== _id);
        setClothingItems(updatedItems);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = (event, values) => {
    event.preventDefault();
    addNewItem(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to fetch new item:", error);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        const mappedItems = data.map((item) => {
          if (
            typeof item.name === "object" &&
            item.name !== null &&
            item.name.name
          ) {
            return {
              ...item,
              name: item.name.name,
              imageUrl: item.name.imageUrl,
              weather: item.name.weather,
            };
          }
          return item;
        });
        mappedItems.sort((a, b) => b._id - a._id);
        setClothingItems(mappedItems);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  activeModal={activeModal}
                  onClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onClick={handleCardClick}
                  clothingItems={clothingItems}
                  activeModal={activeModal}
                  card={selectedCard}
                  onClose={closeActiveModal}
                  onDelete={openDeleteModal}
                  isOpen={activeModal === "add-garment"}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onSubmit={handleAddItemSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={openDeleteModal}
        />
        <DeleteModal
          onConfirm={handleCardDelete}
          onCancel={closeActiveModal}
          activeModal={activeModal}
          onClose={closeActiveModal}
          card={selectedCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
