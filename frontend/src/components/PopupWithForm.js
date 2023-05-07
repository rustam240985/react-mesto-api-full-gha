import React from 'react';

function PopupWithForm({ isOpen, namePopup, onClose, title, buttonText, onSubmit, disabled, children }) {

  function closePopup(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <div className={`popup popup-${namePopup} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={closePopup}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form ${namePopup}-form`} name={`${namePopup}-form`} onSubmit={onSubmit} noValidate>
          {children}
          <button className={`popup__save ${disabled ? 'popup__save_disabled' : ''}`} type="submit" disabled={disabled}>{buttonText}</button>
        </form>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;