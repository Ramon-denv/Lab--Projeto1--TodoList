import React, { useState, useEffect } from 'react';
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:8080/tarefas'; // Substitua pela URL correta da sua API

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setTodos(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Houve um erro ao carregar as tarefas!", error);
                setIsLoading(false);
            });
    }, []);

    const addTodo = (tarefas) => {
        const newTodo = {
            id: uuidv4(),
            titulo: tarefas.titulo,
            descricao: tarefas.descricao,
            completo: tarefas.completo,
            status: tarefas.status,
            prazo: tarefas.prazo,
            prioridade: tarefas.prioridade,
            tarefaLivre: tarefas.tarefaLivre
        };
        setTodos([...todos, newTodo]);
        axios.post(API_URL, newTodo)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };


    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
        axios.delete(`${API_URL}/${id}`);
    };

    const updateTodo = (id, updatedTodo) => {
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        axios.put(`${API_URL}/${id}`, updatedTodo);
    };

    if (isLoading) {
        return <p>Carregando tarefas...</p>;
    }

    return (
        <div className='TodoWrapper'>
            <h1>Lista de Tarefas</h1>
            <TodoForm addTodo={addTodo} />
            <div className='task-columns'>
                {['Tarefas', 'Em Progresso', 'Feito'].map((status, index) => (
                    <div key={index} className='task-column'>
                        <h2>{status}</h2>
                        {todos.filter(todo => todo.status === status).map((tarefas) => (
                            <TodoList
                                key={tarefas.id}
                                tarefas={tarefas}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
                            />
                        ))}
                        <button onClick={() => addTodo()}>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
