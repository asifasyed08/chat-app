import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChatWindow from "./pages/ChatWindow";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <div className="main-wrapper">
      {isLoggedIn ? (
        <ChatWindow />
      ) : (
        <>
          <div className="hero">
            <h1>ChatSphere</h1>
            <p>Real-time messaging platform built with React, Node & Socket.io</p>
          </div>

          <div className="features">
            <div className="feature-box">Real-Time Messaging</div>
            <div className="feature-box">Private Conversations</div>
            <div className="feature-box">Typing Indicators</div>
            <div className="feature-box">Secure JWT Auth</div>
          </div>

          <div className="auth-container">
            <Register />
            <Login setIsLoggedIn={setIsLoggedIn} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;