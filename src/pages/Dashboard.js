import { useEffect, useState } from "react";

function Dashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/rooms")
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {rooms.map(room => (
        <div key={room.id}>
          {room.roomName}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;