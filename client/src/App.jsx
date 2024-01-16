import './App.css'
import { ToDo } from './components/ToDo'
import { CreateToDo } from "./components/CreateToDo";
import React, { useEffect, useState } from "react";

function App() {

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8086/api/to_do/", {
      method: 'get',
      headers: new Headers({
        'userid': "ddfef708-56c8-4566-bba3-ceb3792b33b6"
      }),
    })
      .then(async function (res) {
        const json = await res.json();
        setTodo(json.data);
      })

  }, []);


  return (

    <div>
      <CreateToDo></CreateToDo>
      <ToDo todo={todo} ></ToDo>
    </div >

  )
}

export default App
