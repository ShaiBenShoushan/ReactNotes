

function NewNote (props){
    return (
        <div key={props.id} id={props.id}>
            <h4 id={props.id}>{props.date}</h4>
            <h1 id={props.id}>{props.header}</h1>
            <p id={props.id}>{props.body}</p>
        </div>
    )
}

export default NewNote;