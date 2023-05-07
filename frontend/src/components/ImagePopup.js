function ImagePopup(props) {

  return (
    <div className={`popup popup-image ${props.card.isOpen ? 'popup_opened' : ''}`} onMouseDown={evt => {
      if (evt.target.classList.contains('popup_opened')) {
        props.onClose();
      }
    }}>
      <div className="popup__container popup-image__container">
        <figure className="popup__content">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;