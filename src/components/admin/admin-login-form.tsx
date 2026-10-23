"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result: { error?: string } = await response.json();
      if (!response.ok) {
        setError(result.error ?? "Não foi possível iniciar a sessão.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setSubmitting(false);
      setPassword("");
    }
  }

  return (
    <main className="admin-root admin-login-page">
      <section className="admin-login-panel" aria-labelledby="admin-login-title">
        <Link className="admin-brand" href="/" aria-label="F&V Sports Store, início">
          <span>F&V</span><small>SPORTS / ADMIN</small>
        </Link>
        <p className="admin-kicker">ÁREA RESTRITA</p>
        <h1 id="admin-login-title">Acesso administrativo</h1>
        {!configured ? (
          <p className="admin-alert" role="status">Acesso bloqueado. Configure ADMIN_PASSWORD e ADMIN_SESSION_SECRET no ambiente do servidor.</p>
        ) : (
          <form className="admin-login-form" onSubmit={submit}>
            <label htmlFor="admin-password">Senha</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
            />
            {error && <p className="admin-alert" role="alert">{error}</p>}
            <button className="admin-primary-button" type="submit" disabled={submitting || !password}>
              {submitting ? "Verificando..." : "Entrar"}
            </button>
          </form>
        )}
        <Link className="admin-back-link" href="/">Voltar à loja</Link>
      </section>
    </main>
  );
}