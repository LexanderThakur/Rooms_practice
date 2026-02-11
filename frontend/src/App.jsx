import { useState } from "react";

import LoginPage from "./LoginPage";
import Control from "./Control";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import "./App.css";
function App() {
  return (
    <div className="app-layout">
      <Control />

      <div className="main-content">
        <CreateRoom />
      </div>
    </div>
  );
}

export default App;
