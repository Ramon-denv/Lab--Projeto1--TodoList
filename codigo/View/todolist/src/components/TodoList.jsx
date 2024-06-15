import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export const TodoList = ({ tarefas, deleteTodo, updateTodo }) => {
    return (
        <div className="Todo">
            <p className={`${tarefas.completed ? "completed" : "incompleted"}`}>{tarefas.description}</p>
            <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => updateTodo(tarefas.id, { ...tarefas, completed: !tarefas.completed })} />
            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => deleteTodo(tarefas.id)} />
        </div>
    );
};
