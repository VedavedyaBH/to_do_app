import React, { useEffect, useState } from "react";

export function ToDo() {
  const [todo, setTodo] = useState([]);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchToDo();
  }, []);

  const addTodo = () => {
    const requestBody = {
      title: newTodo.title,
      description: newTodo.description,
    };

    fetch("http://localhost:8086/api/to_do/", {
      method: "POST",
      body: JSON.stringify([requestBody]),
      headers: {
        "Content-Type": "application/json",
        userid: "ddfef708-56c8-4566-bba3-ceb3792b33b6",
      },
    })
      .then(async function (res) {
        const json = await res.json();
        fetchToDo();

        setNewTodo({
          title: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add Todo");
      });
  };

  const fetchToDo = () => {
    fetch("http://localhost:8086/api/to_do/", {
      method: "get",
      headers: new Headers({
        userid: "ddfef708-56c8-4566-bba3-ceb3792b33b6",
      }),
    }).then(async function (res) {
      const json = await res.json();
      setTodo(json.data);
    });
  };

  const deleteToDo = (todo) => {
    fetch("http://localhost:8086/api/to_do/getTodo", {
      method: "delete",
      body: JSON.stringify([
        {
          id: todo.id,
        },
      ]),
      headers: {
        "Content-Type": "application/json",
        userid: "ddfef708-56c8-4566-bba3-ceb3792b33b6",
      },
    }).then(async function (res) {
      fetchToDo();
    });
  };

  const updateTodo = (todo) => {
    fetch("http://localhost:8086/api/to_do/getTodo", {
      method: "put",
      body: JSON.stringify([
        {
          id: todo.id,
          title: todo.title,
          description: todo.description,
        },
      ]),
      headers: {
        "Content-Type": "application/json",
        userid: "ddfef708-56c8-4566-bba3-ceb3792b33b6",
      },
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
          id: todo.id
        },
      ]),
      headers: {
        "Content-Type": "application/json",
        userid: "ddfef708-56c8-4566-bba3-ceb3792b33b6",
      },
    }).then(async function (res) {
      fetchToDo();
    });
  };

  return (
    <>
      <div>
        <h1>
          <input
            type="text"
            placeholder="title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
        </h1>
        <p>
          <input
            type="text"
            placeholder="description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
        </p>
        <button onClick={addTodo}>Add</button>
      </div>
      {todo.map((to_do) => (
        <div key={to_do.id}>
          <h1>
            <input
              type="text"
              placeholder="title"
              value={to_do.title}
              onChange={(e) => updateContent(e.target.value, "title", to_do.id)}
            />
          </h1>
          <p>
            <input
              type="text"
              placeholder="description"
              value={to_do.description}
              onChange={(e) =>
                updateContent(e.target.value, "description", to_do.id)
              }
            />
          </p>
          <button onClick={() => setStatus(to_do)}>Mark as Done</button>
          <button onClick={() => updateTodo(to_do)}>Update</button>
          <button onClick={() => deleteToDo(to_do)}>Delete</button>
        </div>
      ))}
    </>
  );
}
