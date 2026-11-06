"use client";

import { CarFront, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-mark"><CarFront size={27} /></div>
        <div className="login-brand">AutoCRM</div>
        <div className="eyebrow">DEALERSHIP MANAGEMENT</div>
        <h1>С возвращением</h1>
        <p className="muted center">Войдите в рабочее пространство автосалона</p>
        <form action="/" className="login-form">
          <label>Рабочий email</label>
          <div className="input-wrap"><Mail size={17}/><input type="email" placeholder="name@dealership.com" required /></div>
          <label>Пароль</label>
          <div className="input-wrap"><LockKeyhole size={17}/><input type={showPassword ? "text" : "password"} placeholder="Введите пароль" required /><button className="icon-button" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>
          <div className="login-options"><label className="check-label"><input type="checkbox" defaultChecked/> Запомнить меня</label><a href="#">Забыли пароль?</a></div>
          <button className="primary-button full" type="submit">Войти в систему</button>
        </form>
        <p className="login-note">Демонстрационный интерфейс. Серверная авторизация ещё не подключена.</p>
      </section>
    </main>
  );
}
