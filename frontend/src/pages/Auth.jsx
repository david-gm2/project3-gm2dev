import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Auth.css";
import { loginService, registerService } from "../services/authService";

export function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signin");

  useEffect(() => {
    const isSignin = searchParams.get("mode") === "signin";
    setIsLogin(!isSignin);
  }, [searchParams]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let data;

      if (isLogin) {
        data = await loginService({
          email: form.email,
          password: form.password,
        });
        console.log("Login OK:", data);
      } else {
        data = await registerService({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        console.log("Registro OK:", data);
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // limpiar al cambiar entre login / registro
  useEffect(() => {
    setForm({ name: "", email: "", password: "" });
    setError("");
  }, [isLogin]);

  // cambiar modo y reflejarlo en la URL
  const handleToggleMode = () => {
    const nextIsLogin = !isLogin;
    setIsLogin(nextIsLogin);

    if (nextIsLogin) {
      // login → /auth
      setSearchParams({});
    } else {
      // registro → /auth?mode=signin
      setSearchParams({ mode: "signin" });
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Iniciar sesion" : "Crear cuenta"}</h2>

        {!isLogin && (
          <>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Steve"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </>
        )}

        <label htmlFor="email">Mail:</label>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="steve@minecraft.com"
          value={form.email}
          onChange={handleChange}
          autoComplete="username"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="*******"
          value={form.password}
          onChange={handleChange}
          autoComplete={isLogin ? "current-password" : "new-password"}
          required
        />

        {error && <span className="error">{error}</span>}

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : isLogin ? "Entrar" : "Registrarse"}
        </button>
      </form>

      <p onClick={handleToggleMode} className="auth-toggle-text">
        {isLogin
          ? "No tienes cuenta? Registrate"
          : "Ya tienes cuenta? Inicia sesión"}
      </p>
    </main>
  );
}

export default Auth;
