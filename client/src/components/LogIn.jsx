import React, { useEffect, useState } from "react";
import { lazy } from "react";
const ToDo = lazy(() => import("./ToDo"));
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
const SignUp = lazy(() => import("./SignUp"));

function LogIn() {
  const { _login } = useAuth();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter something");
    } else {
      try {
        const response = await fetch("http://localhost:8086/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              username: username.trim(),
              password: password.trim(),
            },
          ]),
        });
        if (response.status === 200) {
          const _token = await response.json();
          console.log(_token.genToken);
          console.log(username);

          _login(username, _token.genToken);
          navigate("/todo");
          alert("Logged In");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const signup = () => {
    navigate("/signup");
  };
  return (
    <>
      <div>
        <button onClick={signup}>Sign Up</button>
        <h1>Log In</h1>
        <h3>Username</h3>
        <input
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <h3>Password</h3>
        <input
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br></br>
        <br></br>
        <button onClick={login}>Login</button>
      </div>
    </>
  );
}
export default LogIn;
