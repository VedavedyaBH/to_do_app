import "./App.css";
import { ToDo } from "./components/ToDo";
import {LogIn} from "./components/LogIn"
import { CreateToDo } from "./components/CreateToDo";
import React, { useEffect, useState } from "react";

function App() {
  return (
    <div>
      <LogIn></LogIn>
      {/* <CreateToDo></CreateToDo> */}
      {/* <ToDo></ToDo> */}
    </div>
  );
}

export default App;
