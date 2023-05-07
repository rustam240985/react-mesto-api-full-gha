

import Card from './Card';

import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

function Main(props) {

  const { avatar, name, about } = useContext(CurrentUserContext);
  const dataCards = useContext(CardContext);

  const cards = dataCards.map(card => (
    {
      likes: card.likes,
      ownerId: card.owner._id,
      id: card._id,
      link: card.link,
      name: card.name
    }
  ))

  return (
    <main className="content">
      <section className="profile page__profile">
        <button className="profile__avatar-btn" onClick={props.onEditAvatar} type="button">
          <img className="profile__avatar" src={avatar} alt={name} /></button>
        <div className="profile__info">
          <div className="profile__line">
            <h1 className="profile__name">{name}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__profession">{about}</p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="Добавить фото"></button>
      </section>
      <section aria-label="Фотографии мест" className="elements page__elements">
        {cards?.map(element => (
          <Card key={element.id} card={element} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main;