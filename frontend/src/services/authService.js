const API_URL = "http://localhost:3000"; 

export async function loginService({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  return data; // ejemplo: { token, user, ... }
}

export async function registerService({ name, email, password }) {
  const res = await fetch(`${API_URL}/auth?mode=signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al registrarse");
  }

  return data;
}
