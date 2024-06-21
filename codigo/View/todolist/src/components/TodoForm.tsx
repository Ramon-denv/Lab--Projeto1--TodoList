import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl,Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { PrioridadeEnum, StatusEnum } from "../service/entities/todo";

interface TodoFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
}

export const TodoForm = ({ open, onClose, onSubmit }: TodoFormProps) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [completo, setCompleto] = useState(false);
    const [prazo, setPrazo] = useState<number>(0);
    const [tarefaLivre, setTarefaLivre] = useState(false);
    const [status, setStatus] = useState<StatusEnum>(StatusEnum.TAREFA);
    const [prioridade, setPrioridade] = useState<PrioridadeEnum>(PrioridadeEnum.BAIXA);

    const handleSubmit = async () => {
        try {
            const formData = {
                titulo: titulo,
                descricao: descricao,
                completo: completo,
                prazo: prazo,
                tarefaLivre: tarefaLivre,
                status: status,
                prioridade: prioridade,
            };
            onSubmit(formData);
        } catch (error) {
            console.error("Erro ao cadastrar tarefa:", error);
        }
    };

    const handleClose = () => {
        setTitulo("");
        setDescricao("");
        setCompleto(false);
        setPrazo(0);
        setTarefaLivre(false);
        setStatus(StatusEnum.TAREFA);
        setPrioridade(PrioridadeEnum.BAIXA);

        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} sx={{ fontFamily: "Arial" }}>
            <DialogTitle sx={{ fontFamily: "Arial" }}>Cadastrar Tarefa</DialogTitle>
            <DialogContent>
                <TextField
                    label="Título"
                    fullWidth
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    margin="normal"
                    sx={{ fontFamily: "Arial" }}
                />
                <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={4}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    margin="normal"
                    sx={{ fontFamily: "Arial" }}
                />
                <TextField
                    label="Prazo"
                    fullWidth
                    multiline
                    rows={1}
                    value={prazo}
                    onChange={(e) => setPrazo(Number(e.target.value))}
                    margin="normal"
                    sx={{ fontFamily: "Arial" }}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="prioridade-label">Prioridade</InputLabel>
                    <Select
                        labelId="prioridade-label"
                        label="Prioridade"
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value as PrioridadeEnum)}
                        sx={{ fontFamily: "Arial" }}
                    >
                        <MenuItem value={PrioridadeEnum.ALTA}>{PrioridadeEnum.ALTA}</MenuItem>
                        <MenuItem value={PrioridadeEnum.MEDIA}>{PrioridadeEnum.MEDIA}</MenuItem>
                        <MenuItem value={PrioridadeEnum.BAIXA}>{PrioridadeEnum.BAIXA}</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
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

export default TodoForm;
