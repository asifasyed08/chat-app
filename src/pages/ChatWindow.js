import { useEffect, useState } from "react";
import socket from "../socket/socket";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([1]);

  useEffect(() => {
    socket.emit("join_room", "general");
    socket.emit("user_online", 1);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receive_message");
      socket.off("online_users");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      room: "general",
      message,
    };

    socket.emit("send_message", msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="app-container">
      <div className="chat-box">

        {/* Sidebar */}
        <div className="sidebar">
          <h2>ChatSphere</h2>

          <div style={{ marginTop: "30px" }}>
            <h3>Online Users</h3>

            {onlineUsers.map((user, index) => (
              <div className="online-user" key={index}>
                🟢 User {user}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat */}
        <div className="chat-main">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              borderBottom: "1px solid #eee"
            }}
          >
            <h2>General Chat Room</h2>

            <button
              onClick={logout}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "10px",
                background: "#ef4444",
                color: "white",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              height: "450px",
              background: "#f8fafc"
            }}
          >
            {messages.length === 0 ? (
              <p style={{ color: "#64748b" }}>
                Start conversation...
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    padding: "14px",
                    marginBottom: "12px",
                    borderRadius: "14px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                  }}
                >
                  {msg.message}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: "20px",
              gap: "10px",
              borderTop: "1px solid #eee"
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                flex: 1,
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                outline: "none"
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "16px 26px",
                border: "none",
                borderRadius: "12px",
                background: "#667eea",
                color: "white",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatWindow;