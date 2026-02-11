import "./Control.css";

function Control({ setPage }) {
  return (
    <div className="control-bar">
      <div className="title">Control</div>
      <div className="option" onClick={() => setPage("Create Room")}>
        Create Room
      </div>
      <div className="option" onClick={() => setPage("Join Room")}>
        Join Room
      </div>
      <div
        className="option"
        onClick={() => {
          setPage("Your Rooms");
        }}
      >
        Your Rooms
      </div>
    </div>
  );
}

export default Control;
