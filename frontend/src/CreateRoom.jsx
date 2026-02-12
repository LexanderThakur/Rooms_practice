import "./CreateRoom.css";

import { useState } from "react";
const api = "http://localhost:8000";

function CreateRoom() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  async function create_room() {
    const name = document.querySelector(".room_name").value;
    const description = document.querySelector(".room_desc").value;
    try {
      const response = await fetch(api + "/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });

      const data = await response.json();
      console.log(data);
      alert("Created Successfully");
    } catch (err) {
      alert("Network Error");
    }
  }

  return (
    <div className="room-box">
      <h2 className="c_t">Create Room</h2>

      <input
        type="text"
        placeholder="Room Name"
        className="room_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="room_desc"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button className="c_b" onClick={create_room}>
        Create Room
      </button>
    </div>
  );
}

export default CreateRoom;
