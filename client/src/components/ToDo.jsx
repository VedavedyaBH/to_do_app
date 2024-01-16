import React, { useEffect, useState } from "react";
export function ToDo({ todo }) {


    function deleteToDo() {
        console.log(todo[0].id)
        fetch("http://localhost:8086/api/to_do/getTodo", {
            method: "delete",
            body: JSON.stringify([{
                id: todo[0].id
            }]),
            headers: ({
                'Content-Type': 'application/json',
                'userid': "ddfef708-56c8-4566-bba3-ceb3792b33b6"
            })
        }).then(function () {
            alert("deleted")
            onDelete()

        })
    }


    return <div>
        {todo?.map(function display(to_do) {
            return <div>
                <h1>{to_do.title}</h1>
                <h1>{to_do.description}</h1>
                <button>Completed</button>
                <button>Mark as Done</button>
                <button>Update</button>
                <button onClick={deleteToDo}>Delete</button>
            </div>
           
        })}

    </div>






}