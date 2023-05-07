import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';
import { Routes, Route, useNavigate } from 'react-router-dom'

import api from '../utils/Api';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth.js';
import { AppContext } from '../contexts/AppContext';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';

function App() {
  const [loading, setLoading] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: "Джек", about: "Воробей" });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setRegistered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch(error => {
        alert(`Ошибка загрузки данных на странице: ${error}`);
      })
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, [])

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.isOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email)
            setLoggedIn(true);
            navigate("/", { replace: true })
          }
        })
        .catch(err => console.log(err))
    }
  }

  function handleLogin(formValue) {
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setEmail(formValue.email);
          return navigate('/', { replace: true });
        }
      })
      .catch(err => alert(`Возникла ошибка ${err}`));

  }

  function handleRegister(formValue) {
    auth.register(formValue.password, formValue.email)
      .then((res) => {
        if (res.data) {
          navigate('/sign-in', { replace: true });
          setRegistered(true);
          return setMessage('Вы успешно зарегистрировались!');
        }
      })
      .catch(err => {
        setMessage('Что-то пошло не так! Попробуйте еще раз.')
        console.log(err)
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      })
  }

  function handleClickSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, ...card })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipOpen(false);
    setRegistered(false);
    setSelectedCard({});
    setMessage('');
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card.id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card.id ? newCard : c));
      })
      .catch(err => {
        alert(`Ошибка лайка: ${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card.id)
      .then(data => {
        console.log(data)
        setCards(state => state.filter(c => c._id !== card.id));
      })
      .catch(err => {
        alert(`Ошибка удаления карточки: ${err}`);
      });
  }

  function handleUpdateUser(user) {
    setLoading(true);
    api.setUser(user)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        alert(`Ошибка обновления данных пользователя: ${err}`);
      })
      .finally(() => setLoading(false))
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api.setUserAvatar(avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        alert(`Ошибка обновления аватара: ${err}`);
      })
      .finally(() => setLoading(false))
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        alert(`Ошибка добавления карточки: ${err}`);
      })
      .finally(() => setLoading(false))
  }

  return (
    <AppContext.Provider value={{ loggedIn, email, handleClickSignOut, isRegistered }}>
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={cards}>
          <div className="page">
            <div className="page__container">
              <Header />
              <Routes>

                <Route path="/"
                  element={<ProtectedRouteElement element={Main} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />} />
                <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
                <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              {loggedIn && <Footer />}
            </div>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={loading} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} isLoading={loading} />
            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={loading} />
            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} message={message} />
          </div>
        </CardContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
