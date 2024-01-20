import React, { useEffect, useState } from "react";
export function ToDo() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetchToDo();
  }, []);

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
    console.log(todo.id);
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

  return (
    <>
      {todo?.map((to_do) => (
        <div>
          <h1 key={to_do.title}>{to_do.title}</h1>
          <p key={to_do.description}>{to_do.description}</p>
          <button>Mark as Done</button>
          <button>Update</button>
          <button onClick={() => deleteToDo(to_do)}>Delete</button>
        </div>
      ))}
    </>
  );
}
