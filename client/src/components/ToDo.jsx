export function ToDo({ todo }) {

    return <div>
        {todo?.map(function (to_do) {
            return <div>
                <h1>{to_do.title}</h1>
                <h1>{to_do.description}</h1>
                <button>Completed</button>
            </div>
        })}

    </div>


}