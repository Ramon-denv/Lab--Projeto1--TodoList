import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import { ITodo } from "../service/entities/todo";
import { postTask, deleteTasks, editTodo, getTasks } from "../service/index.ts";
import TodoList from "../components/TodoList.tsx";
import EditTodo from "../components/EditTodo.tsx";
import TodoForm from "../components/TodoForm.tsx";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks();
        console.log("Fetched tasks:", response);
        setTodos(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Handle error state or logging as needed
      }
    };
    fetchData();
  }, []);
  

  const handleEdit = (todo: ITodo) => {
    console.log("Editing task:", todo); // Debugging log
    setSelectedTodo(todo);
    setOpenEdit(true);
  };

  const handleEditSubmit = async (Data: ITodo) => {
    debugger
    if (selectedTodo) {
      await editTodo(selectedTodo.id, Data);
      setOpenEdit(false);
      setSelectedTodo(null);
      const updatedTodos = await getTasks();
      setTodos(updatedTodos);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTasks(id);
    const updatedTodos = await getTasks();
    setTodos(updatedTodos);
  };

  const handleSubmit = async (formData: ITodo) => {
    await postTask(formData);
    const updatedTodos = await getTasks();
    setTodos(updatedTodos);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    debugger
    setOpenEdit(false);
  };

  const getTodosByStatusAndPriority = (status: string) => ({
    high: todos.filter(todo => todo.status === status && todo.prioridade === "ALTA"),
    medium: todos.filter(todo => todo.status === status && todo.prioridade === "MEDIA"),
    low: todos.filter(todo => todo.status === status && todo.prioridade === "BAIXA")
  });

  const statuses = {
    TAREFA: getTodosByStatusAndPriority("TAREFA"),
    INICIALIZADA: getTodosByStatusAndPriority("INICIALIZADA"),
    FINALIZADA: getTodosByStatusAndPriority("FINALIZADA")
  };

  const countTodosByStatus = (status: string) => todos.filter(todo => todo.status === status).length;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ fontFamily: "Arial", textAlign: 'center' }}>
        Lista de Tarefas
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{ fontFamily: "Arial", width: '100%' }}
      >
        Adicionar Tarefa
      </Button>
      <Grid container spacing={25}>
        {["TAREFA", "INICIALIZADA", "FINALIZADA"].map(status => (
          <Grid item xs={12} sm={4} key={status}>
            <Typography variant="h5" sx={{ fontFamily: "Arial", mb: 2 }}>
              {status === "TAREFA" && `Tarefas (${countTodosByStatus("TAREFA")})`}
              {status === "INICIALIZADA" && `Em Progresso (${countTodosByStatus("INICIALIZADA")})`}
              {status === "FINALIZADA" && `Feito (${countTodosByStatus("FINALIZADA")})`}
            </Typography>
            {statuses[status].high.length > 0 && (
              <>
                <Typography variant="h6">Prioridade Alta</Typography>
                <TodoList tasks={statuses[status].high} onEdit={handleEdit} onDelete={handleDelete} />
              </>
            )}
            {statuses[status].medium.length > 0 && (
              <>
                <Typography variant="h6">Prioridade Média</Typography>
                <TodoList tasks={statuses[status].medium} onEdit={handleEdit} onDelete={handleDelete} />
              </>
            )}
            {statuses[status].low.length > 0 && (
              <>
                <Typography variant="h6">Prioridade Baixa</Typography>
                <TodoList tasks={statuses[status].low} onEdit={handleEdit} onDelete={handleDelete} />
              </>
            )}
          </Grid>
        ))}
      </Grid>
      <TodoForm open={open} onClose={handleClose} onSubmit={handleSubmit} />
      <EditTodo card={selectedTodo} open={openEdit} onClose={handleCloseEdit} />
    </Container>
  );
};

export default Home;
