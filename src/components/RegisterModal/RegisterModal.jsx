import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./RegisterModal.css";

function RegisterModal({ activeModal, closeActiveModal, handleOutsideClick, isLoading, handleRegistration }) {
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            handleRegistration(values);
        }
    };

    useEffect(() => {
        if (activeModal) {
            resetForm();
        }
    }, [activeModal, resetForm]);

    return (
        <ModalWithForm
            title="Sign Up"
            buttonText={isLoading ? "Loading..." : "Sign Up"}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
            onSubmit={handleSubmit}
            isFormValid={isValid}
            secondaryButtonText="or Log In"
        >
            <label htmlFor="email" className="modal__label">
                Email*
                <input
                    type="email"
                    name="email"
                    className="modal__input"
                    id="email"
                    placeholder="Email"
                    value={values.email || ""}
                    onChange={handleChange}
                    required
                />
                {errors.email && <span className="modal__error">{errors.email}</span>}
            </label>
            <label htmlFor="password" className="modal__label">
                Password*
                <input
                    type="password"
                    name="password"
                    className="modal__input"
                    id="password"
                    placeholder="Password"
                    value={values.password || ""}
                    onChange={handleChange}
                    required
                />
                {errors.password && <span className="modal__error">{errors.password}</span>}
            </label>
            <label htmlFor="name" className="modal__label">
                Name*
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
                Avatar URL*
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

export default RegisterModal;
