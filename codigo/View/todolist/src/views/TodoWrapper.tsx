import { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { ITodo } from "../service/entities/todo";
import { AddTodo, deleteTodo, editTodo, getTodo } from "../service/index";
import TodoList from "../components/TodoList";
import EditTodo from "../components/EditTodo";
import TodoForm from "../components/TodoForm";
import AddIcon from "@mui/icons-material/Add";

enum StatusEnum {
    TAREFA = "TAREFA",
    INICIALIZADA = "INICIALIZADA",
    FINALIZADA = "FINALIZADA"
}

type Priority = "ALTA" | "MEDIA" | "BAIXA";

interface TodosByPriority {
    high: ITodo[];
    medium: ITodo[];
    low: ITodo[];
}

const Home = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getTodo();
            setTodos(response);
        };
        fetchData();
    }, []);

    const handleEdit = (todo: ITodo) => {
        setSelectedTodo(todo);
        setOpenEdit(true);
    };

    const handleEditSubmit = async (formData: ITodo) => {
        if (selectedTodo) {
            await editTodo(selectedTodo.id, formData);
            setOpenEdit(false);
            setSelectedTodo(null);
            const updatedTodos = await getTodo();
            setTodos(updatedTodos);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        const updatedTodos = await getTodo();
        setTodos(updatedTodos);
    };

    const handleSubmit = async (formData: ITodo) => {
        await AddTodo(formData);
        const updatedTodos = await getTodo();
        setTodos(updatedTodos);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const getTodosByStatusAndPriority = (status: StatusEnum): TodosByPriority => ({
        high: todos.filter(todo => todo.status === status && todo.prioridade === "ALTA"),
        medium: todos.filter(todo => todo.status === status && todo.prioridade === "MEDIA"),
        low: todos.filter(todo => todo.status === status && todo.prioridade === "BAIXA")
    });

    const statuses: Record<StatusEnum, TodosByPriority> = {
        [StatusEnum.TAREFA]: getTodosByStatusAndPriority(StatusEnum.TAREFA),
        [StatusEnum.INICIALIZADA]: getTodosByStatusAndPriority(StatusEnum.INICIALIZADA),
        [StatusEnum.FINALIZADA]: getTodosByStatusAndPriority(StatusEnum.FINALIZADA)
    };

    const handleStatusChange = async (todo: ITodo) => {
        const updatedStatus: StatusEnum =
            todo.status === StatusEnum.TAREFA ? StatusEnum.INICIALIZADA :
                todo.status === StatusEnum.INICIALIZADA ? StatusEnum.FINALIZADA :
                    StatusEnum.TAREFA;

        await editTodo(todo.id, { ...todo, status: updatedStatus });
        const updatedTodos = await getTodo();
        setTodos(updatedTodos);
    };

    const countTodosByStatus = (status: StatusEnum) => todos.filter(todo => todo.status === status).length;

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box mb={3}>
                <Typography variant="h4" sx={{ fontFamily: "Arial", textAlign: 'center' }}>
                    Lista de Tarefas
                </Typography>
            </Box>
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
                {([StatusEnum.TAREFA, StatusEnum.INICIALIZADA, StatusEnum.FINALIZADA]).map(status => (
                    <Grid item xs={12} sm={4} key={status}>
                        <Typography variant="h5" sx={{ fontFamily: "Arial", mb: 2 }}>
                            {status === StatusEnum.TAREFA && `Tarefas (${countTodosByStatus(StatusEnum.TAREFA)})`}
                            {status === StatusEnum.INICIALIZADA && `Em Progresso (${countTodosByStatus(StatusEnum.INICIALIZADA)})`}
                            {status === StatusEnum.FINALIZADA && `Feito (${countTodosByStatus(StatusEnum.FINALIZADA)})`}
                        </Typography>
                        {statuses[status].high.length > 0 && (
                            <>
                                <Typography variant="h6">Prioridade Alta</Typography>
                                {statuses[status].high.map(todo => (
                                    <TodoList key={todo.id} todo={todo} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                                ))}
                            </>
                        )}
                        {statuses[status].medium.length > 0 && (
                            <>
                                <Typography variant="h6">Prioridade Média</Typography>
                                {statuses[status].medium.map(todo => (
                                    <TodoList key={todo.id} todo={todo} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                                ))}
                            </>
                        )}
                        {statuses[status].low.length > 0 && (
                            <>
                                <Typography variant="h6">Prioridade Baixa</Typography>
                                {statuses[status].low.map(todo => (
                                    <TodoList key={todo.id} todo={todo} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                                ))}
                            </>
                        )}
                    </Grid>
                ))}
            </Grid>
            <TodoForm open={open} onClose={handleClose} onSubmit={handleSubmit} />
            <EditTodo open={openEdit} onClose={handleCloseEdit} onSubmit={handleEditSubmit} selectedTodo={selectedTodo} />
        </Container>
    );
};

export default Home;
