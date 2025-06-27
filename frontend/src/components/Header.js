import React from 'react';

export default function Header({ username, onLogout }) {
  return (
    <header className="bg-blue-600 text-white px-4 py-3 justify-between items-center">
      <h1 className="flex justify-center text-xl font-bold">PDF Generator</h1>
      {username && (
        <div className="flex items-center gap-4">
          <p className="italic">Welcome, {username}!</p>
          <h2 className="bg-red-500 right-1  hover:bg-red-600 px-3 py-1 rounded">
          <button
            onClick={onLogout}
            className="bg-red-500  hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button></h2>
        </div>
      )}
    </header>
  );
}
