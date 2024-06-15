import React from 'react';
import { ITodo } from "../service/entities/todo";
import { Card, CardContent, Typography, Grid, IconButton, Box, Checkbox } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoListProps {
    todo: ITodo;
    onEdit: (todo: ITodo) => void;
    onDelete: (id: number) => void;
    onStatusChange: (todo: ITodo) => void;  // Adicionado aqui
}

export const TodoList = ({ todo, onEdit, onDelete, onStatusChange }: TodoListProps) => {
    if (!todo) {
        return null;
    }

    const handleDeleteClick = () => {
        onDelete(todo.id);
    };

    const handleEditClick = () => {
        onEdit(todo);
    };

    const handleStatusChange = () => {
        onStatusChange(todo);
    };

    const getBorderColor = () => {
        switch (todo.prioridade) {
            case "ALTA":
                return "red";
            case "MEDIA":
                return "orange";
            case "BAIXA":
                return "green";
            default:
                return "gray";
        }
    };

    return (
        <Card sx={{ boxShadow: 0, width: '310px', borderRadius: '25px', border: `3px solid ${getBorderColor()}`, mb: 2, p: 2 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Checkbox
                    checked={todo.status === "FINALIZADA"}
                    indeterminate={todo.status === "INICIALIZADA"}
                    onChange={handleStatusChange}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'Arial' }}>
                        {todo.titulo}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'Arial' }}>
                        {todo.prazo}
                    </Typography>
                </Box>
                <Box>
                    <IconButton onClick={handleEditClick} aria-label="Editar">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteClick} aria-label="Excluir">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TodoList;
