// import React, { useState, useEffect } from 'react';
// import Header from './components/Header';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import MyFiles from './components/MyFiles';

// function App() {
//   const [token, setToken] = useState(() => localStorage.getItem('token') || '');
//   const [username, setUsername] = useState('');
//   const [showRegister, setShowRegister] = useState(false);

//   const handleLogin = async (newToken) => {
//     setToken(newToken);
//     localStorage.setItem('token', newToken); // ✅ حفظ التوكن

//     try {
//       const res = await fetch('https://pdf-02ix.onrender.com/api/auth/me', {
//         headers: {
//           Authorization: `Bearer ${newToken}`,
//         },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setUsername(data.username);
//       } else {
//         console.warn('Failed to fetch username');
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken('');
//     setUsername('');
//   };

//   // ✅ تحميل اسم المستخدم عند وجود توكن في localStorage
//   useEffect(() => {
//     const fetchUsername = async () => {
//       if (!token) return;

//       try {
//         const res = await fetch('https://pdf-02ix.onrender.com/api/auth/me', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setUsername(data.username);
//         } else {
//           console.warn('Failed to fetch username');
//         }
//       } catch (err) {
//         console.error('Error fetching username:', err);
//       }
//     };

//     fetchUsername();
//   }, [token]);

//   return (
//     <div>
//       <Header username={username} onLogout={handleLogout} />

//       {!token && showRegister && (
//         <RegisterForm
//           onRegisterClick={() => setShowRegister(false)}
//           onRegisterSuccess={() => setShowRegister(false)}
//         />
//       )}

//       {!token && !showRegister && (
//         <LoginForm
//           onLogin={handleLogin}
//           onRegisterClick={() => setShowRegister(true)}
//         />
//       )}

//       {token && <MyFiles token={token} />}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MyFiles from './components/MyFiles';
import EditPDF from './pages/EditPDF';
// import FabricEditor from './pages/FabricEditor';
import KonvaEditorPage from './pages/KonvaEditorPage';



function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [username, setUsername] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);

    try {
      const res = await fetch('https://pdf-02ix.onrender.com/api/auth/me', {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsername(data.username);
      } else {
        console.warn('Failed to fetch username');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUsername('');
  };

  useEffect(() => {
    const fetchUsername = async () => {
      if (!token) return;

      try {
        const res = await fetch('https://pdf-02ix.onrender.com/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUsername(data.username);
        } else {
          console.warn('Failed to fetch username');
        }
      } catch (err) {
        console.error('Error fetching username:', err);
      }
    };

    fetchUsername();
  }, [token]);

  return (
    <Router>
      <Header username={username} onLogout={handleLogout} />

      {!token && showRegister && (
        <RegisterForm
          onRegisterClick={() => setShowRegister(false)}
          onRegisterSuccess={() => setShowRegister(false)}
        />
      )}

      {!token && !showRegister && (
        <LoginForm
          onLogin={handleLogin}
          onRegisterClick={() => setShowRegister(true)}
        />
      )}

      {token && (
        <Routes>
          <Route path="/" element={<MyFiles token={token} />} />
          
          <Route path="/edit-konva/:id" element={<KonvaEditorPage token={token} />} />
           
        </Routes>
      )}
    </Router>
  );
}

export default App;
