import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { postTask } from '../service/index.ts';
import { tipoTarefa } from '../enums/tipoTarefa.tsx';

const TodoForm = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState(tipoTarefa.DATA);
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState("");
  const [priority, setPriority] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setTaskType(tipoTarefa.DATA);
      setEndDate("");
      setDays("");
      setPriority("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        titulo: title,
        description: description,
        complete: false,
        createdAt: new Date().toISOString(),
        dataFim: taskType === tipoTarefa.DATA ? endDate : null,
        status: 0,
        taskLivre: taskType === tipoTarefa.LIVRE,
        prazo: taskType === tipoTarefa.DIAS ? parseInt(days) : null,
        prioridade: priority,
        tipoTarefa: taskType,
      };

      const response = await postTask(data);
      if (response.id > 0) {
        setShowSuccessMessage(true);
      } else {
        throw new Error("Erro ao salvar a tarefa");
      }
    } catch (error) {
      setShowErrorMessage(true);
    } finally {
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
        window.location.reload();
      }, 3000);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Título"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descrição"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Prioridade"
          type="text"
          fullWidth
          select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          SelectProps={{ native: true }}
        >
          <option value="ALTA">Alta</option>
          <option value="MEDIA">Média</option>
          <option value="BAIXA">Baixa</option>
        </TextField>
        <TextField
          margin="dense"
          label="Tipo de Tarefa"
          type="text"
          fullWidth
          select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          SelectProps={{ native: true }}
        >
          <option value={tipoTarefa.DATA}>Por Data</option>
          <option value={tipoTarefa.DIAS}>Por Dias</option>
          <option value={tipoTarefa.LIVRE}>Livre</option>
        </TextField>
        {taskType === tipoTarefa.DATA && (
          <TextField
            margin="dense"
            label="Data de Término"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        )}
        {taskType === tipoTarefa.DIAS && (
          <TextField
            margin="dense"
            label="Dias para Completar"
            type="number"
            fullWidth
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoForm;
