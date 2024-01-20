import "./App.css";
import { ToDo } from "./components/ToDo";
import { CreateToDo } from "./components/CreateToDo";
import React, { useEffect, useState } from "react";

function App() {
  return (
    <div>
      <CreateToDo></CreateToDo>
      <ToDo></ToDo>
    </div>
  );
}

export default App;
