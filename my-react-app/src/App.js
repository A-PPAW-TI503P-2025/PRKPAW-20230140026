import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    // Ambil pesan dari server Node.js
    fetch('http://localhost:3001')
      .then(res => res.json())
      .then(data => setServerMessage(data.message))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  return (
    <div className="App">
      <h1>Praktikum 1 - Pengembangan Aplikasi Web</h1>
      <p>{serverMessage}</p>

      <input
        type="text"
        placeholder="Masukkan nama kamu..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h2>{name ? `Hello, ${name}!` : 'Silakan ketik nama di atas'}</h2>
    </div>
  );
}

export default App;
