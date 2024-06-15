import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { Icon } from "@iconify/react";

interface EditTodoProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
    selectedTodo: any;
}

const EditTodo = ({ open, onClose, onSubmit, selectedTodo }: EditTodoProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (selectedTodo) {
            setTitle(selectedTodo.titulo || "");
            setContent(selectedTodo.descricao || "");
        }
    }, [selectedTodo]);

    const handleSubmit = async () => {
        try {
            const formData = {
                titulo: title,
                descricao: content,
            };
            onSubmit(formData); // Chamando onSubmit com os dados do formulário
        } catch (error) {
            console.error("Erro ao editar tarefa:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ fontFamily: "Arial" }}>Editar Tarefa</DialogTitle>
            <DialogContent>
                <TextField
                    label="Título"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    sx={{ fontFamily: "Arial" }}
                />
                <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                    sx={{ fontFamily: "Arial" }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="error"
                    startIcon={<Icon icon="mdi:cancel-bold" />}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<Icon icon="mingcute:save-line" />}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTodo;