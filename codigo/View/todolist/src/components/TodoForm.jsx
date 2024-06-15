import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const TodoForm = ({ addTodo }) => {
    const initialState = {
        titulo: '',
        descricao: '',
        status: 'TAREFA',
        prazo: 10,
        prioridade: 'MEDIA',
        tarefaLivre: false
    };

    const [isOpen, setIsOpen] = useState(false);
    const [formState, setFormState] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formState.titulo && formState.descricao) {
            addTodo({
                ...formState,
                completo: false
            });
            // Reset dos campos após adicionar a tarefa
            setFormState(initialState);
        }
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Adicionar Tarefa</button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                <form className="TodoForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="titulo"
                        value={formState.titulo}
                        onChange={handleChange}
                        placeholder='Título da Tarefa'
                        required
                    />
                    <input
                        type="text"
                        name="descricao"
                        value={formState.descricao}
                        onChange={handleChange}
                        placeholder='Descrição da Tarefa'
                        required
                    />
                    <select
                        name="status"
                        value={formState.status}
                        onChange={handleChange}
                    >
                        <option value="TAREFA">Tarefa</option>
                        <option value="CONCLUIDA">Concluída</option>
                        <option value="PENDENTE">Pendente</option>
                    </select>
                    <input
                        type="number"
                        name="prazo"
                        value={formState.prazo}
                        onChange={handleChange}
                        placeholder='Prazo (dias)'
                    />
                    <select
                        name="prioridade"
                        value={formState.prioridade}
                        onChange={handleChange}
                    >
                        <option value="BAIXA">Baixa</option>
                        <option value="MEDIA">Média</option>
                        <option value="ALTA">Alta</option>
                    </select>
                    <label>
                        Tarefa Livre:
                        <input
                            type="checkbox"
                            name="tarefaLivre"
                            checked={formState.tarefaLivre}
                            onChange={(e) => setFormState(prevState => ({ ...prevState, tarefaLivre: e.target.checked }))}
                        />
                    </label>
                    <button type="submit" className='todo-btn'>Adicionar Tarefa</button>
                </form>
                <button onClick={() => setIsOpen(false)}>Fechar</button>
            </Modal>
        </div>
    );
};
