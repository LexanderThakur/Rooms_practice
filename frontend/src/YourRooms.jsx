import { useState, useEffect, use } from "react";
import "./YourRooms.css";
const api = "http://localhost:8000";
function YourRooms() {
  const [myRooms, setMyRooms] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);

  async function my_rooms() {
    try {
      const response = await fetch(api + "/getmy/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      //   const text = await response.text();
      //   console.log(text);
      const data = await response.json();
      console.log(data);
      setMyRooms(data.message);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    my_rooms();
  }, []);

  return (
    <div className="main-container">
      <h1>Your Rooms</h1>
      <div className="my-rooms-container">
        {myRooms.map((room) => (
          <div className="room-card" key={room.id}>
            <div className="room-title">{room.name}</div>
            <div className="room-desc">{room.description}</div>

            {/* <button className="join-btn">Join</button> */}
          </div>
        ))}
      </div>
      <h1>Joined Rooms</h1>
      <div className="joined-rooms"></div>
    </div>
  );
}

export default YourRooms;
