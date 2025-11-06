export function validateRegister({ name, email, password }) {
    const errors = {};

    if (!name.trim()) errors.name = "El nombre es obligatorio";

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        errors.email = "Correo invalido";

    if (password.length < 6)
        errors.password = "La password debe tener al menos 6 caracteres";

    return errors;
}

export function validateLogin({ email, password }) {
    const errors = {};
    if (!email) errors.email = "Correo requerido";
    if (!password) errors.password = "Password requerida";
    return errors;
}
