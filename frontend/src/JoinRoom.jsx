import { useState, useEffect } from "react";
import "./JoinRoom.css";
const api = "http://127.0.0.1:8000";
function JoinRoom() {
  let [rooms, setRooms] = useState([]);
  async function my_rooms() {
    let arr = [];
    try {
      const response = await fetch(api + "/get/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      console.log(data);
      setRooms(data.message);
    } catch (err) {
      console.log(err);
    }
  }
  async function join_room(room_id) {
    let arr = [];
    try {
      const response = await fetch(api + "/join/" + room_id + "/", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      console.log(data);
      if (response.ok) {
        alert("Joined Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    my_rooms();
  }, []);

  return (
    <div className="rooms-container">
      {rooms.map((room) => (
        <div className="room-card" key={room.id}>
          <div className="room-title">{room.name}</div>
          <div className="room-desc">{room.description}</div>
          <div className="room-desc"> OWNER: {room.owner.email}</div>
          <button className="join-btn" onClick={() => join_room(room.id)}>
            Join
          </button>
        </div>
      ))}
    </div>
  );
}

export default JoinRoom;
