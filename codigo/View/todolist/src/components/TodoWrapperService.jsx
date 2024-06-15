import React, { useState, useEffect } from 'react';
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import axios from 'axios';


export const TodoWrapperService = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = (task) => {
        axios.post('http://localhost:8080/tarefas', task)
            .then(response => {
                setTodos([...todos, response.data]);
            })
            .catch(error => {
                console.error("Houve um erro ao adicionar a tarefa!", error);
            });
    };


    return (
        <div className='TodoWrapper'>
            <h1>Lista de Tarefas! (Service)</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                <TodoList task={todo} key={index} />
            ))}
        </div>
    );
};
