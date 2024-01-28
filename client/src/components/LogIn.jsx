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

          _login(username, _token.genToken);
          navigate("/todo");
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
      <div className="bg-gray-950 text-slate-200 h-screen flex items-center justify-center">
        <div className="border border-white rounded p-10 shadow-inner shadow-white ">
          <div className="flex">
            <p className="pt-2 pr-12">Not a user? </p>
            <button
              className="text-slate-200 bg-transparent hover:bg-white hover:text-gray-950 font-semibold py-2 px-4 border border-none-500 hover:border-transparent rounded"
              onClick={signup}
            >
              Sign Up
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold pb-2">Log In</h1>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                className="text-slate-200 bg-transparent font-semibold py-2 px-4 border border-none-500  rounded"
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
                className="text-slate-200 bg-transparent  font-semibold py-2 px-4 border border-none-500  rounded"
                required
              />
            </div>
            <div className="float-right">
              <button
                className="text-slate-200 bg-transparent hover:bg-white hover:text-gray-950 font-semibold py-2 px-4 border border-none-500 hover:border-transparent rounded"
                onClick={login}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LogIn;
