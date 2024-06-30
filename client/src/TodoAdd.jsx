import React, { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "./api";

const styles = {
    inputStyles: {
        borderColor: "black",
        // fontWeight: "bold",
        Color: "Black",
        border: "None",

    }
}

const apiUrl = "http://localhost:5000"

export const TodoList = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [todos, setTodos] = useState([])
    const [error, setError] = useState("")
    const [editId, setEditId] = useState(-1)
    const [editTitle, setEditTitle] = useState("")
    const [editDesc, setEditDesc] = useState("")

 
    useEffect(() => {
        getTodos()
        .then(data => setTodos(data))
        .catch(err => setError(err.message))
    }, [])


    //Add todo
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDesc = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = () => {
        if (title.trim() !== '' && description.trim() !== '') {
                addTodo(title, description)
                .then((data) => {
                    setTitle('');
                    setDescription('');
                    setTodos([...todos, data]);
                    alert("Item added successfully!")                                 
                })
                .catch((err) => {
                    setError(`Error occured: ${err.message}`);
                });
        } else {
            setError("Please fill out both title and description.");
        }
    }

    const deleteTodo = (id) => {
        fetch(apiUrl + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (res.ok) {
                    alert("Deletion successful")
                    setTodos(todos.filter(todo => todo._id !== id))
                    return
                }
                throw new Error("Unable to add todo")
            }).catch((err) => {
                setError(`Error occured: ${err.message}`)
            })
    }

    //Edit todo
    const handleEdit = (id) => {
        setEditId(id)
        todos.map(todo => {
            if (todo._id == id) {
                setEditTitle(todo.title)
                setEditDesc(todo.description)
            }
        })
    }

    const handleUpdate = (e) => {
        fetch(apiUrl + `/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: editTitle, description: editDesc })
        }).then((res) => {
            if (!res.ok) throw new Error("Error saving editing file")
            setEditTitle("")
            setEditDesc("")
            setEditId(-1)
            getTodos()
        })
            .catch((err) => setError(`Error: ${err.message}`))
    }


    return (
        <div style={{ backgroundColor: "#E5E5E5", minHeight: "100vh", minWidth: "100vw" }}>
            <div className="row p-1 text-light text-center" style={{ backgroundColor: "#114589" }}>
                <h1 className="text-center display-4 fw-bold">To-Do Tracker</h1>
            </div>
            <div className="text-center col-md-6 mx-auto mt-5" >
                <div className="form-group d-flex gap-2 my-4 p-3">
                    {editId === -1 ?
                        <>
                            <div className="col-md-6">
                                <input type="text" className="form-control" value={title} placeholder="Add title..." onChange={handleTitle} name="todo" style={styles.inputStyles} ></input>
                                <input type="text" className="form-control mt-2" value={description} placeholder="Add description..." onChange={handleDesc} name="todo" style={styles.inputStyles}></input>
                            </div>
                            <div>
                                <button className="btn btn-success" onClick={handleSubmit}>Add</button>
                            </div>
                        </> :
                        <>
                            <div className="col-md-10 ">
                                <input type="text" className="form-control" name="todo" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={styles.inputStyles}></input>
                                <input type="text" className="form-control mt-1" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} name="todo" style={styles.inputStyles}></input>
                            </div>
                            <div>
                                <button className="btn btn-success" onClick={(e) => handleUpdate(e)}>Update</button>
                            </div>
                        </>
                    }

                </div>
                <h1 style={{color: "#114595"}}>Task list!!!</h1>
                {error && <h4 className="text-danger mt-3">{error}</h4>}
                <ul className="col-md-12 mx-auto mt-4 list-group text-center ">
                    {todos.map((todo) => {
                        return (
                            <li key={todo._id} className="d-flex align-items-center justify-content-between list-group-item">
                                <div className="d-flex  flex-column mx-auto">
                                    <span className="fw-bold" >{todo.title}</span>
                                    <span className="text-muted" >{todo.description}</span>
                                </div>
                                <div className="ml-5">
                                    <button className="btn btn-primary mx-2" onClick={() => handleEdit(todo._id)} >Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>Delete</button>
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>

        </div>
    )
}
