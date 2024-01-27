import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userid, setUserid] = useState(localStorage.getItem("userid") || "");

  const _login = async (newUsername, newToken) => {
    setUsername(newUsername);
    setToken(newToken);

    console.log(newUsername);

    try {
      const response = await fetch("http://localhost:8086/api/user/name/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername.trim(),
        }),
      });
      console.log(response.status);
      if (response.status === 200) {
        let _userid = await response.json();
        console.log(_userid);
        setUserid(_userid);
        localStorage.setItem("userid", JSON.stringify({ _userid }));
      }
    } catch (error) {
      console.error("Error:", error);
    }

    localStorage.setItem("username", JSON.stringify({ newUsername }));
    localStorage.setItem("token", JSON.stringify({ newToken }));
  };

  const logout = () => {
    setUsername("");
    setUserid("");
    setToken("");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
  };

  const contextValue = {
    username,
    userid,
    token,
    _login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
