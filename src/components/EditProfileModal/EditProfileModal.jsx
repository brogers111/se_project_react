import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./EditProfileModal.css";

function EditProfileModal({ activeModal, closeActiveModal, handleOutsideClick, isLoading, onUpdateProfile }) {
    const {values, handleChange, errors, isValid, setValues} = useFormAndValidation()

    const { currentUser } = useContext(CurrentUserContext);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if (isValid) {
            onUpdateProfile(values);
        }
    };

    useEffect(()=>{
        setValues({ ...values, name: currentUser.name, avatar: currentUser.avatar })
    },[])

    return (
        <ModalWithForm
            title="Change profile data"
            buttonText={isLoading ? "Loading..." : "Save changes"}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
            onSubmit={handleUpdateProfile}
            isFormValid={isValid}
        >
            <label htmlFor="name" className="modal__label">
                Name
                <input
                    type="text"
                    name="name"
                    className="modal__input"
                    id="name"
                    placeholder="Name"
                    value={values.name || ""}
                    onChange={handleChange}
                    required
                />
                {errors.name && <span className="modal__error">{errors.name}</span>}
            </label>
            <label htmlFor="avatar" className="modal__label">
                Avatar
                <input
                    type="url"
                    name="avatar"
                    className="modal__input"
                    id="avatar"
                    placeholder="Avatar URL"
                    value={values.avatar || ""}
                    onChange={handleChange}
                    required
                />
                {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
            </label>
        </ModalWithForm>
    );
}

export default EditProfileModal;
