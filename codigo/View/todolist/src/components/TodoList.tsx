import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { tipoTarefa } from "../enums/tipoTarefa.tsx";

const TodoList = ({ tasks, onEdit, onDelete }) => {
  const getBorderColor = (priority) => {
    switch (priority) {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const calculateDaysRemaining = (dateString) => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    const differenceInMillis = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));
  };

  const setColorDate = (dateString) => {
    return calculateDaysRemaining(dateString) <= 2 ? "red" : "inherit";
  };

  return (
    <>
      {tasks.map((todo) => (
        <Card
          key={todo.id}
          sx={{
            boxShadow: 0,
            width: '310px',
            borderRadius: '25px',
            border: `3px solid ${getBorderColor(todo.prioridade)}`,
            mb: 2,
            p: 2
          }}
          onClick={() => onEdit(todo)}
        >
          <CardContent
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight={500}>
                {todo.titulo}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {todo.prazo}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {todo.prioridade}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {todo.tipoTarefa === tipoTarefa.DIAS && (
                  <span style={{ color: setColorDate(todo.dataFim) }}>
                    {calculateDaysRemaining(todo.dataFim)} dias
                  </span>
                )}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {todo.descricao}
              </Typography>
            </Box>
            <IconButton onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default TodoList;
