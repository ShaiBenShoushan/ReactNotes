

function NewNote (props){
    return (
        <li key={props.id} id={props.id}>
            <h4>{props.date}</h4>
            <h1>{props.header}</h1>
            <p>{props.body}</p>
        </li>
    )
}

export default NewNote;