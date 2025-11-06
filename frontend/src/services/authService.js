// src/services/authService.js
const API_URL = "https://minecraftbackend-production.up.railway.app";

export async function loginService({ email, password }) {
  const res = await fetch(`${API_URL}/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text(); // leer texto por si no es JSON
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Servidor no devolvió JSON");
  }

  if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");
  return data;
}

export async function registerService({ name, email, password }) {
  const res = await fetch(`${API_URL}/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const text = await res.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch (err){
    console.error(err);
    throw new Error("Servidor no devolvio JSON", err);
  }

  if (!res.ok) throw new Error(data.message || "Error al registrarse");
  return data;
}
