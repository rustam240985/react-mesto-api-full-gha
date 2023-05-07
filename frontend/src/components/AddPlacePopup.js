import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../utils/hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const buttonText = isLoading ? 'Создание...' : 'Создать';

  useEffect(() => {
    if (isOpen) {
      resetForm({ ...values, place: '', url: '' }, { ...errors, place: '', url: '' });
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      onAddCard({
        name: values.place,
        link: values.url,
      });
    }
  }

  return (
    <PopupWithForm
      namePopup='add-card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      disabled={!isValid}>
      <label className="popup__field">
        <input
          value={values.place || ''}
          onChange={handleChange}
          className={`popup__input popup__input_value_place  ${errors.place ? 'popup__input_type_error' : ''}`}
          id="place-input"
          type="text"
          name="place"
          placeholder="Новое место"
          minLength="2"
          maxLength="30"
          required />
        <span className={`popup__input-error place-input-error ${errors.place ? 'popup__input-error_active' : ''}`}>{errors.place}</span>
      </label>
      <label className="popup__field">
        <input
          value={values.url || ''}
          onChange={handleChange}
          className={`popup__input popup__input_value_url ${errors.url ? 'popup__input_type_error' : ''}`}
          id="url-input"
          type="url"
          name="url"
          placeholder="Ссылка на картинку"
          required />
        <span className={`popup__input-error url-input-error ${errors.url ? 'popup__input-error_active' : ''}`}>{errors.url}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;