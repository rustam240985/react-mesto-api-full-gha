import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.ownerId === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const countLikes = card.likes.length;

  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }


  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && <button className="element__trash" type="button" onClick={handleDeleteClick} aria-label="Удалить карточку"></button>}
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится" ></button>
          <span className="element__likes-count">{countLikes !== 0 ? countLikes : ''}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;