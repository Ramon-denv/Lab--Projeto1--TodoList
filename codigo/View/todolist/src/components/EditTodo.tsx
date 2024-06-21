import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { onAdvanceTask, postTask } from '../service/index.ts';
import { tipoTarefa } from '../enums/tipoTarefa.tsx';

const EditTodo = ({ card, open, onClose, onSubmit }) => {
  const calculateDaysRemaining = (dateString) => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    const differenceInMillis = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));
  };

  const [titulo, setTitulo] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    if (card) {
      setTitulo(card.titulo);
      setDescription(card.description);
      setTaskType(card.tipoTarefa);
      setEndDate(card.dataFim || '');
      setDays(calculateDaysRemaining(card.dataFim) || '');
      setPriority(card.prioridade);
      setStatus(card.status);
    }
  }, [card]);

  useEffect(() => {
    if (taskType === tipoTarefa.DATA) {
      setDays(calculateDaysRemaining(endDate));
    }
  }, [endDate, taskType]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        id: card.id,
        titulo,
        description,
        complete: false,
        createdAt: card.createdAt,
        dataFim: taskType === tipoTarefa.DATA ? endDate : null,
        taskLivre: taskType === tipoTarefa.LIVRE,
        prazo: taskType === tipoTarefa.DIAS ? days : null,
        prioridade: priority,
        tipoTarefa: taskType,
        status,
      };
      const response = await postTask(data);

      if (response.id > 0) {
        setShowSuccessMessage(true);
        setMensagemSucesso("Tarefa editada com sucesso!");
      } else {
        throw new Error("Erro ao salvar a tarefa");
      }
    } catch (error) {
      setShowErrorMessage(true);
      setMensagemErro("Erro ao salvar a tarefa: " + error);
    } finally {
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
        window.location.reload();
      }, 3000);
      setIsLoading(false);
    }
  };

  if (!card) {
    return null; // Or return a fallback UI
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Título"
          type="text"
          fullWidth
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
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

export default EditTodo;
