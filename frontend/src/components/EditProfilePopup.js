import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../utils/hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';

  useEffect(() => {
    if (isOpen) {
      resetForm({ ...values, name: currentUser.name, description: currentUser.about },
        { ...errors, name: '', description: '' });
      setIsValid(true);
    }
  }, [currentUser, isOpen]);


  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      onUpdateUser({
        name: values.name,
        about: values.description,
      });
    }
  }

  return (
    <PopupWithForm namePopup='profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} buttonText={buttonText} onSubmit={handleSubmit} disabled={!isValid}>
      <label className="popup__field">
        <input
          value={values.name || ''}
          className={`popup__input popup__input_value_name ${errors.name ? 'popup__input_type_error' : ''}`}
          id="name-input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          required />
        <span className={`popup__input-error name-input-error ${errors.name ? 'popup__input-error_active' : ''}`}>{errors.name}</span>
      </label>
      <label className="popup__field">
        <input
          value={values.description || ''}
          className={`popup__input popup__input_value_profession ${errors.description ? 'popup__input_type_error' : ''}`}
          id="profession-input"
          type="text"
          name="description"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          required />
        <span className={`popup__input-error profession-input-error ${errors.description ? 'popup__input-error_active' : ''}`}>{errors.description}</span>
      </label>
    </PopupWithForm >
  )


}


export default EditProfilePopup;