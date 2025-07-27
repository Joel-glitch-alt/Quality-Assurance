import React, { useState } from "react";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    if (status) {
      setLoggedIn(true);
    } else {
      alert("Invalid login!");
    }
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <h2>Welcome Admin!</h2>
          <TodoList />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
