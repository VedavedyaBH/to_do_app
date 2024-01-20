import React, { useState } from "react";

export function CreateToDo() {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  function addTo_do() {
    const requestBody = {
      title: title,
      description: description,
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
        console.log(json);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add Todo");
      });
  }
  return (
    <div>
      <input
        id="title"
        type="text"
        placeholder="title"
        onChange={function (e) {
          const value = e.target.value;
          setTitle(e.target.value);
        }}
      ></input>
      <input
        id="desc"
        type="text"
        placeholder="description"
        onChange={function (e) {
          const value = e.target.value;
          setdescription(e.target.value);
        }}
      ></input>
      <button onClick={addTo_do}>Add</button>
    </div>
  );
}
