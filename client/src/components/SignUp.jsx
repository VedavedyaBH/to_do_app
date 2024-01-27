import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lazy } from "react";

const LogIn = lazy(() => import("./LogIn"));

function SignUp() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    if (username.trim() === "" || password.trim === "") {
      alert("Please enter something");
    } else {
      fetch("http://localhost:8086/api/register", {
        method: "Post",
        headers: new Headers({
          username: username.trim(),
          password: password.trim(),
        }),
      }).then(async (res) => {
        if (res.status === 200) {
          alert("done");
          navigate("/login");
        }
        if (res.status === 400) {
          alert("Exists");
        }
      });
    }
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <>
      <div>
        <button onClick={login}>Log in</button>
        <h1>Sign Up</h1>
        <h3>User Name</h3>
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
        <button onClick={signUp}>Sign up</button>
      </div>
    </>
  );
}
export default SignUp;
