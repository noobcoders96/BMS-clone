import { ENDPOINTS, USE_DUMMY_DATA } from "./config";
import { DUMMY_USER } from "../data/dummyData";

const fakeDelay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

export async function login(email, password) {
  if (USE_DUMMY_DATA) {
    await fakeDelay();
    localStorage.setItem("bms_token", "dummy.jwt.token");
    localStorage.setItem("bms_user", JSON.stringify(DUMMY_USER));
    return { token: "dummy.jwt.token", user: DUMMY_USER };
  }

  // ============================================================
  // 🔌 PLUG IN HERE — POST /api/auth/login  (User Service)
  // Request: { email, password }
  // Response: { token, user: { userId, name, email } }
  // ============================================================
  const res = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const data = await res.json();
  localStorage.setItem("bms_token", data.token);
  localStorage.setItem("bms_user", JSON.stringify(data.user));
  return data;
}

export function getCurrentUser() {
  const raw = localStorage.getItem("bms_user");
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem("bms_token");
  localStorage.removeItem("bms_user");
}
