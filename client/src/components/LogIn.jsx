import React, { useState } from "react";

export function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    fetch("http://localhost:8086/api/register", {
      method: "Post",
      headers: new Headers({
        username: username,
        password: password,
      }),
    }).then(async (res) => {
      console.log(res);
      alert("done");
    });
  };

  return (
    <>
      <div>
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
