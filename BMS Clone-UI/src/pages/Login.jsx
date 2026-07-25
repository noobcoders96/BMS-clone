import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("karthik@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="field">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        <button className="pill-btn" style={{ width: "100%", padding: "10px 0" }} disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 14 }}>
          Dummy mode: any email/password works. Real call hits POST /api/auth/login on User Service.
        </p>
      </form>
    </div>
  );
}
