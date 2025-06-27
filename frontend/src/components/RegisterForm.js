import React, { useState } from 'react';

export default function RegisterForm({ onRegisterClick, onRegisterSuccess }) {
  const [username, setUsername] = useState(''); // ✅ أضفنا الاسم
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('https://pdf-02ix.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }), // ✅ أضفناه للطلب
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✔️ Registered successfully! You can now log in.');
        onRegisterSuccess();
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center font-semibold">Register</h2>

      {/* 🧩 حقل اسم المستخدم */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded"
      />

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

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Register
      </button>

      <p
        className="mt-3 text-sm text-blue-600 cursor-pointer text-center hover:underline"
        onClick={onRegisterClick}
      >
        Already have an account? Log in
      </p>

      {message && <p className="mt-3 text-red-600 text-center">{message}</p>}
    </form>
  );
}

