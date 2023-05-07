import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../utils/hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';

  useEffect(() => {
    if (isOpen) {
      resetForm({ ...values, url: '' }, { ...errors, url: '' })
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateAvatar({
        avatar: values.url,
      });
    }
  }

  return (
    <PopupWithForm
      namePopup='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      disabled={!isValid}>
      <label className="popup__field">
        <input
          value={values.url || ''}
          className={`popup__input popup__input_value_url ${errors.url ? 'popup__input_type_error' : ''}`}
          id="avatar-input" type="url"
          name="url"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          required />
        <span className={`popup__input-error avatar-input-error ${errors.url ? 'popup__input-error_active' : ''}`}>{errors.url}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;