import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./LoginModal.css";

function LoginModal({ activeModal, closeActiveModal, handleOutsideClick, isLoading, handleLogin }) {
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            handleLogin(values);
        }
    };

    useEffect(() => {
        if (activeModal) {
            resetForm();
        }
    }, [activeModal, resetForm]);

    return (
        <ModalWithForm
            title="Log In"
            buttonText={isLoading ? "Loading..." : "Log In"}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
            onSubmit={handleSubmit}
            isFormValid={isValid}
            secondaryButtonText="or Sign Up"
        >
            <label htmlFor="email" className="modal__label">
                Email
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
                Password
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
        </ModalWithForm>
    );
}

export default LoginModal;
