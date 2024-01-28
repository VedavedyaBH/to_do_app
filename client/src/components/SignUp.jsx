import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          alert("Please Login");
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
      <div className="bg-gray-950 text-slate-200 h-screen flex items-center justify-center">
        <div className="border border-white rounded p-10 shadow-inner shadow-white ">
          <div className="flex">
            <p className="pt-2 pr-10">Already a user? </p>
            <button
              className="text-slate-200 bg-transparent hover:bg-white hover:text-black font-semibold hover:text-white py-2 px-4 border border-none-500 hover:border-transparent rounded"
              onClick={login}
            >
              Log in
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold pb-2">Sign Up</h1>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                className="text-slate-200 bg-transparent  hover:text-white font-semibold hover:text-white py-2 px-4 border border-none-500  rounded"
                placeholder="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="text-slate-200 bg-transparent  hover:text-white font-semibold hover:text-white py-2 px-4 border border-none-500  rounded"
                required
              />
            </div>
            <div className="float-right">
              <button
                className="text-slate-200 bg-transparent hover:bg-white hover:text-black font-semibold hover:text-white py-2 px-4 border border-none-500 hover:border-transparent rounded"
                onClick={signUp}
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
