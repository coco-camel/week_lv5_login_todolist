import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTodoList, todoRegister, todoRemove, todoToggle, todoModify } from "../../apis/TodoApis/todoList";

export const __getTodos = createAsyncThunk(
    'get/todos',
    async () => {
        const result = await getTodoList();
        return result;
    });

export const __todoRegister = createAsyncThunk(
    'todos/register',
    async (todo) => {
        const result = await todoRegister(todo);
        return result;
    });

export const __todoRemove = createAsyncThunk(
    'todos/remove',
    async (id) => {
        const result = await todoRemove(id);
        return result;
    });

export const __todoToggle = createAsyncThunk(
    'todos/toggle',
    async (todo) => {
        const result = await todoToggle(todo);
        return result;
    });

export const __todoModify = createAsyncThunk(
    'todos/modify',
    async (todo) => {
        const result = await todoModify(todo);
        return result;
    });

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        loading: true,
    },
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(__getTodos.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(__getTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            });

            builder.addCase(__todoRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
            });

            builder.addCase(__todoRemove.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            });

            builder.addCase(__todoToggle.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return { ...todo, done: !todo.done };
                    }
                    return todo;
                });
            });

            builder.addCase(__todoModify.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo);
            });
        }
});

export default todosSlice.reducer;

