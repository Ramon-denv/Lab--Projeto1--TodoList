import React from 'react';
import { TodoForm} from "./TodoForm";
import { TodoList } from "./TodoList";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([
        {id: 1, description: 'Tarefa exemplo', completed: false}
    ]);

    const addTodo = (todo) => {
        setTodos([
            ...todos,
            { id: uuidv4(), task: description, completed: false },
        ]);
    }
    return (
        <div className='TodoWrapper'>
            <h1>Lista de Tarefas</h1>
            <TodoForm addTodo={addTodo}/>
            {todos.map((item) =>
                <TodoList
                    key={item.id}
                    task={item}
                />
            )
            }
        </div>
    );
}