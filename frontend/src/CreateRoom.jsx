import "./CreateRoom.css";

function CreateRoom() {
  return (
    <div className="room-box">
      <h2 className="c_t">Create Room</h2>

      <input type="text" placeholder="Room Name" className="room_name" />
      <textarea placeholder="Description" className="room_desc"></textarea>

      <button className="c_b">Create Room</button>
    </div>
  );
}

export default CreateRoom;
