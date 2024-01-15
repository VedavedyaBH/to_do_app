export function CreateToDo({ todo }) {
    return <div>
        {todo.map(function (to_do) {
            return <div>
                <input type="text" placeholder="title"></input>
                <input type="text" placeholder="description"></input>
                <button>Add</button>
                <button>Mark as Done</button>
                <button>Update</button>
                <button>Delete</button>
            </div>
        })}

    </div>  



}