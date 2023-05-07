import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import yes from '../images/yes.svg'
import error from '../images/error.svg'

const InfoTooltip = ({ isOpen, onClose, message }) => {
  const contextApp = useContext(AppContext);

  function closePopup(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <div className={`popup popup-info ${isOpen ? 'popup_opened' : ''}`} onMouseDown={closePopup}>
      <div className="popup__container popup-info__container">
        {contextApp.isRegistered ? <img src={yes} alt={message} /> : <img src={error} alt={message} />}
        <h2 className="popup__title popup-info__title">{message}</h2>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  )

}

export default InfoTooltip;