import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../App/App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Footer from "../../components/Footer/Footer";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { coordinates, apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { setToken, getToken, removeToken } from "../../utils/token";
import * as auth from "../../utils/auth";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  addNewItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike
} from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";


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

  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();


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
  
  function handleSubmit(request) {
    const jwt = getToken();
    setIsLoading(true);
    request(jwt)
    .then(() => {
      closeActiveModal();
    })
    .catch((err) => {
      console.error("Submission request failed:", err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleCardDelete = (_id) => {
    const jwt = getToken();

    deleteItem(_id, jwt)
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

  const handleLoginSubmit = (email, password) => {
    const makeRequest = () => {
      return auth.authorize(email, password).then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          return auth.checkToken(res.token).then((userData) => {
            const cleanUser = userData.data ? userData.data : userData;
            setCurrentUser(cleanUser);
          });
        }
      });
    };
    handleSubmit(makeRequest);
  };

  const handleRegisterSubmit = (name, avatar, email, password) => {
   const makeRequest =() => {
    return auth.register(name, avatar, email, password).then(() => {
      handleLoginSubmit(email, password);
    });
   };
   handleSubmit(makeRequest);
  };

  const handleEditProfileSubmit = (values) => {
    setIsLoading(true);
    const jwt = getToken();

    updateProfile(values, jwt)
    .then((updateUser) => {
      setCurrentUser(updateUser);
      closeActiveModal();
    })
    .catch((error) => {
      console.error("Failed to update profile data:", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = (event, values) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Loading started, isLoading:", true);

    const jwt = getToken();

    const makeRequest = (jwt) => {
      return addNewItem(values, jwt).then((response) => {
        const cleanCard = response.data ? response.data : response;
        setClothingItems([cleanCard, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest);
  };
  

  const handleCardLike = ({ id, isLiked })  => {
    const jwt = getToken();

        if (!isLiked) {
        addCardLike(id, jwt)
          .then((updatedCard) => {
          const cleanUpdatedCard = updatedCard.data ? updatedCard.data : updatedCard; 

          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? cleanUpdatedCard : item))
          );
        })
        .catch((err) => console.error("Error adding like:", err));
      } else {
      removeCardLike(id, jwt) 
        .then((updatedCard) => {
          console.log("Unlike server response structure:", updatedCard);

          const cleanUpdatedCard = updatedCard.data ? updatedCard.data : updatedCard;
          setClothingItems((cards) => 
              cards.map((item) => (item._id === id ? cleanUpdatedCard : item))
            );
        })
      .catch((err) => console.error("Error removing like:", err));
      }
};
const handleSignOut = () => {
  removeToken();
  setIsLoggedIn(false);
  setCurrentUser({});
  navigate("/");
};

  useEffect(() => {
    getWeather(coordinates, apiKey)
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

  useEffect(() => {
    const jwt = getToken();

    if(!jwt) {
      return;
    }

    auth.checkToken(jwt)
    .then((user) => {
      setIsLoggedIn(true);
      setCurrentUser(user);
    })
    .catch((err) => {
      console.error("Token verification failed:", err);
      localStorage.removeItem("jwt");
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header 
          handleAddClick={handleAddClick} 
          weatherData={weatherData} 
          isLoggedIn={isLoggedIn}
          onRegisterClick={() => setActiveModal("register")}
          onLoginClick={() => setActiveModal("login")}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  activeModal={activeModal}
                  onClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onClick={handleCardClick}
                  clothingItems={clothingItems}
                  activeModal={activeModal}
                  card={selectedCard}
                  onClose={closeActiveModal}
                  onDelete={openDeleteModal}
                  isOpen={activeModal === "add-garment"}
                  handleAddClick={handleAddClick}
                  handleEditProfileClick={() => setActiveModal("edit-profile")}
                  handleSignOut={handleSignOut}
                  isLoggedIn={isLoggedIn}
                  onCardLike={handleCardLike}
                />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onSubmit={handleAddItemSubmit}
          isLoading={isLoading}
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
        <EditProfileModal
         isOpen={activeModal === "edit-profile"}
         onClose={closeActiveModal}
         onSubmit={handleEditProfileSubmit}
         isLoading={isLoading}
        />
        <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeActiveModal}
        onSubmit={handleRegisterSubmit}
        handleLoginClick={() => setActiveModal("login")}
        />
        <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        onSubmit={handleLoginSubmit}
        handleRegisterClick={() => setActiveModal("register")}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
