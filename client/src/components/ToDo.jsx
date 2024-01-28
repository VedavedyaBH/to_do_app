import React, { useEffect, useState } from "react";
import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LogIn = lazy(() => import("./LogIn"));

function ToDo() {
  const { userid, token, logout } = useAuth();
  let navigate = useNavigate();
  const [todo, setTodo] = useState([]);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchToDo();
  }, [token, userid]);

  const addTodo = async () => {
    const requestBody = {
      title: newTodo.title,
      description: newTodo.description,
    };

    if (newTodo.title == "" || newTodo.description == "") {
      alert("Please enter something");
    } else {
      let response = await fetch("http://localhost:8086/api/to_do/", {
        method: "POST",
        body: JSON.stringify([requestBody]),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          userid: JSON.stringify(userid),
        },
      });

      if (response.status == 200) {
        fetchToDo();
        setNewTodo({
          title: "",
          description: "",
        });
      }
      if (response.status == 401) {
        alert("Please login again");
      }
      if (response.status == 400) {
        alert("Failed to add Todo");
      }
    }
  };

  const fetchToDo = async () => {
    try {
      const response = await fetch("http://localhost:8086/api/to_do/", {
        method: "get",
        headers: {
          Authorization: token,
          userid: JSON.stringify(userid),
        },
      });

      if (response.status === 200) {
        const json = await response.json();
        setTodo(json.to_doData);
      }
    } catch (error) {}
  };

  const deleteToDo = async (todo) => {
    const response = await fetch("http://localhost:8086/api/to_do/getTodo", {
      method: "DELETE",
      body: JSON.stringify([
        {
          id: todo.id,
        },
      ]),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        userid: JSON.stringify(userid),
      },
    });

    if (response.status == 200) {
      fetchToDo();
    }
  };

  const updateTodo = (todo) => {
    fetch("http://localhost:8086/api/to_do/getTodo", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        userid: JSON.stringify(userid),
      },
      body: JSON.stringify([
        {
          id: todo.id,
          title: todo.title,
          description: todo.description,
        },
      ]),
    }).then(async function (res) {
      fetchToDo();
    });
  };

  // chatGPT helped me with this
  const updateContent = (newContent, type, id) => {
    setTodo((prevTodo) =>
      prevTodo.map((item) =>
        item.id === id ? { ...item, [type]: newContent } : item
      )
    );
  };

  const setStatus = (todo) => {
    fetch("http://localhost:8086/api/to_do/setStatus", {
      method: "post",
      body: JSON.stringify([
        {
          id: todo.id,
        },
      ]),
      headers: {
        "Content-Type": "application/json",
        userid: userid,
      },
    }).then(async function (res) {
      fetchToDo();
    });
  };

  return (
    <>
      <div className="bg-gray-950 text-slate-200 h-screen flex items-center justify-center overflow-auto ">
        {userid.trim() === "" ? (
          <>
            <div>
              <h1 className="text-2xl font-bold pb-2">
                Login or Sign Up Please!
              </h1>
              <div className=" flex items-center justify-center">
                <div className="p-2">
                  <button
                    className="text-slate-200 bg-transparent hover:bg-white hover:text-gray-950 font-semibold  p-4 border border-none-500 hover:border-transparent rounded"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                </div>
                <div className="p-2">
                  <button
                    className="text-slate-200 bg-transparent hover:bg-white font-semibold hover:text-gray-950 p-4 border border-none-500 hover:border-transparent rounded"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    signup
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex space-x-4">
              {/* Left child */}
              <div className="flex-shrink-0 m-auto p-9 border border-white">
                <div>
                  <div className="">
                    <div className="pb-5">
                      <button
                        className="text-slate-200 bg-transparent hover:bg-white  font-semibold hover:text-gray-950 p-4 border border-none-500 hover:border-transparent rounded"
                        onClick={() => {
                          logout();
                          navigate("/login");
                        }}
                      >
                        sign out
                      </button>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold pb-2">Need Todo?</h1>
                      <div className="pb-5">
                        <input
                          className="text-slate-200 bg-transparent  hover:text-gray-950 font-semibold  py-2 px-4 border border-none-500  rounded"
                          type="text"
                          placeholder="title"
                          value={newTodo.title}
                          onChange={(e) =>
                            setNewTodo({ ...newTodo, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="pb-5">
                        <input
                          className="text-slate-200 bg-transparent  hover:text-gray-950 font-semibold py-2 px-4 border border-none-500  rounded"
                          type="text"
                          placeholder="description"
                          value={newTodo.description}
                          onChange={(e) =>
                            setNewTodo({
                              ...newTodo,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <button
                          className="text-slate-200 bg-transparent hover:bg-white font-semibold hover:text-gray-950 p-4 border border-none-500 hover:border-transparent rounded"
                          onClick={addTodo}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-12">
                {/* Right child with scroll */}
                <div className="flex-grow overflow-y-auto items-center justify-center max-h-screen overflow-y-scroll scrollbar-hide">
                  <div className="ml-auto flex flex-col ">
                    {todo.length === 0 ? null : (
                      <>
                        <h1 className="text-2xl font-bold pt-3 pb-3">ToDos</h1>

                        <div>
                          {todo?.map((to_do) => (
                            <div key={to_do.id} className="pb-5">
                              <div className="pb-5">
                                <input
                                  className="text-slate-200 bg-transparent  font-semibold py-2 px-4 w-80 border border-none-500  rounded"
                                  type="text"
                                  placeholder="title"
                                  value={to_do.title}
                                  onChange={(e) =>
                                    updateContent(
                                      e.target.value,
                                      "title",
                                      to_do.id
                                    )
                                  }
                                />
                              </div>
                              <div className="pb-5">
                                <input
                                  className="text-slate-200 bg-transparent  font-semibold py-2 px-4 w-80 border border-none-500  rounded"
                                  type="text"
                                  placeholder="description"
                                  value={to_do.description}
                                  onChange={(e) =>
                                    updateContent(
                                      e.target.value,
                                      "description",
                                      to_do.id
                                    )
                                  }
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="pr-2">
                                  <button
                                    className="text-slate-200 bg-transparent hover:bg-white hover:text-gray-950 font-semibold p-4 border border-none-500 hover:border-transparent rounded"
                                    onClick={() => setStatus(to_do)}
                                  >
                                    Mark as Done
                                  </button>
                                </div>
                                <div className="pr-2">
                                  <button
                                    className="text-slate-200 bg-transparent hover:bg-white font-semibold hover:text-gray-950 p-4 border border-none-500 hover:border-transparent rounded"
                                    onClick={() => updateTodo(to_do)}
                                  >
                                    Update
                                  </button>
                                </div>
                                <div className="pr-2">
                                  <button
                                    className="text-slate-200 bg-transparent hover:bg-white font-semibold hover:text-gray-950 p-4 border border-none-500 hover:border-transparent rounded"
                                    onClick={() => deleteToDo(to_do)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default ToDo;
