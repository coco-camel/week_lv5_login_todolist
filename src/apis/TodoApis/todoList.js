import auth from "./todoAxios";

export const getTodoList = async () => {
    try {
        const result = await auth.get("/todos");
        return result.data;
    } catch (error) {
        if (error.response.status === 401) {
            alert(error.response.data.message);
        }
    }
};

export const todoRegister = async (todo) => {
    try {
        const result = await auth.post("/todos", { ...todo, done: false });
        return result.data;
    } catch (error) {
        if (error.response.status === 401) {
            alert(error.response.data.message);
        }
    }
};

export const todoRemove = async (id) => {
    try {
        const result = await auth.delete(`/todos/${id}`);
        return result.data;
    } catch (error) {
        if (error.response.status === 401) {
            alert(error.response.data.message);
        }
    }
};

export const todoToggle = async (todo) => {
    try {
        const result = await auth.put(`/todos/${todo.id}`, { ...todo, done: !todo.done });
        return result.data;
    } catch (error) {
        if (error.response.status === 401) {
            alert(error.response.data.message);
        }
    }
};

export const todoModify = async (todo) => {
    try {
        const result = await auth.put(`/todos/${todo.id}`, { ...todo });
        return result.data;
    } catch (error) {
        if (error.response.status === 401) {
            alert(error.response.data.message);
        }
    }
};