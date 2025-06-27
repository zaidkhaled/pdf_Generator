import React, { useState } from 'react';

export default function LoginForm({ onLogin, onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // 🔐 إرسال بيانات تسجيل الدخول إلى السيرفر
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token); // ✅ حفظ التوكن
        onLogin(data.token);

      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>

      {/* 📍 رابط للتبديل إلى نموذج التسجيل */}
      <p
        className="mt-3 text-sm text-blue-600 cursor-pointer text-center hover:underline"
        onClick={onRegisterClick}
      >
        Don’t have an account? Register
      </p>

      {message && <p className="mt-3 text-red-600 text-center">{message}</p>}
    </form>
  );
}
