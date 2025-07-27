import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      onLogin(true);
    } else {
      onLogin(false);
    }
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={styles.form}
        data-testid="login-form"
      >
        <h2 style={styles.header}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          data-testid="username"
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          data-testid="password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" data-testid="login-button" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    width: "300px",
  },
  header: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.75rem",
    marginBottom: "1rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;
