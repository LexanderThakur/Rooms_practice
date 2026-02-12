import { useState } from "react";

import LoginPage from "./LoginPage";
import Control from "./Control";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import "./App.css";
import YourRooms from "./YourRooms";
function App() {
  const [page, setPage] = useState("Create Room");
  const [onLogin, setLogin] = useState(false);

  return (
    <>
      {!onLogin && <LoginPage setLogin={setLogin} />}

      {onLogin && (
        <div className="app-layout">
          <Control setPage={setPage} />

          <div className="main-content">
            {page === "Create Room" && <CreateRoom />}
            {page === "Join Room" && <JoinRoom />}
            {page === "Your Rooms" && <YourRooms />}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
