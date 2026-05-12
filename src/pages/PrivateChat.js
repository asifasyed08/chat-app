import { useEffect, useState } from "react";
import socket from "../socket/socket";

function PrivateChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const conversationId = 1;

  useEffect(() => {
    socket.emit("join_private_room", conversationId);

    socket.on("receive_private_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("message_read", (id) => {
      console.log("Message read:", id);
    });

    return () => {
      socket.off("receive_private_message");
      socket.off("message_read");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("private_message", {
      conversationId,
      senderId: 1,
      message
    });

    setMessage("");
  };

  return (
    <div>
      <h2>Private Chat</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      {messages.map((msg, i) => (
        <p key={i}>
          {msg.message}
        </p>
      ))}
    </div>
  );
}

export default PrivateChat;