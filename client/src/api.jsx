const apiUrl = "http://localhost:5000";

export const getTodos = () => {
    return fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error("Failed to fetch");
        }
        return res.json();
    })
};

export const addTodo = (title, description) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return res.json().then((err) =>{
                throw new Error(err.message)
            })
        }).catch((err) => {
            throw err;
        })
};

export const deleteTodo = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error("Unable to delete todo");
        }
    });
};

export const updateTodo = (id, title, description) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
    }).then(res => {
        if (!res.ok) {
            throw new Error("Error saving edited todo");
        }
    });
};
