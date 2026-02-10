import { useState } from "react";

import LoginPage from "./LoginPage";
import Control from "./Control";
function App() {
  const [isLoggedIn, setLogin] = useState(false);

  return (
    <>
      {!isLoggedIn && (
        <LoginPage
          onLogin={() => {
            setLogin(true);
          }}
        />
      )}
      {isLoggedIn && <Control />}
    </>
  );
}

export default App;
