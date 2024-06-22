import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { editTodo } from '../service/index.ts';
import { tipoTarefa } from '../enums/tipoTarefa.tsx';
import { Status } from '../enums/Status.tsx';
import { onAdvanceTask } from '../service/index.ts';

const EditTodo = ({ card, open, onClose }) => {

  const calculateDaysRemaining = (dateString) => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    const differenceInMillis = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));
  };

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescription] = useState('');
  const [taskType, setTaskType] = useState();
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
      console.log(card);
      setTitulo(card.titulo);
      setDescription(card.descricao);
      setTaskType(card.tipoTask);
      setEndDate(card.data_fim || '');
      setDays(card.data_fim || '');
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
        descricao,
        complete: false,
        createdAt: card.createdAt,
        data_fim: taskType === tipoTarefa.DATA ? (endDate || card.data_fim) : null,
        taskLivre: taskType === tipoTarefa.LIVRE,
        prazo: taskType === tipoTarefa.DIAS ? days : null,
        prioridade: priority,
        tipoTask: taskType,
        status,
      };
      const response = await editTodo(data);

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
        window.location.reload(); // Recarrega a página após o fechamento do diálogo
      }, 3000);
      setIsLoading(false);
    }
  };

  const getTaskTypeValue = (taskType) => {
    switch (taskType) {
        case tipoTarefa.DATA:
            return 0;
        case tipoTarefa.DIAS:
            return 1;
        case tipoTarefa.LIVRE:
            return 2;
        default:
            return null;
    }
};
const getTaskStatusValue = (status) => {
  switch (status) {
      case Status.TAREFA:
          return 0;
      case Status.INICIALIZADA:
          return 1;
      case Status.FINALIZADA:
          return 2;
      default:
          return 0; 
      }
};

const onAdvance = async (id) => {
  setIsLoading(true);
  try {
      const response = await onAdvanceTask(id, getTaskStatusValue(status) + 1);

      if (response.id > 0) {
          setStatus(response.status); // Atualiza o status local
          setShowSuccessMessage(true);
          setMensagemSucesso(`A tarefa avançou para ${response.status} com sucesso!`);
      } else {
          throw new Error('Erro ao avançar a tarefa');
      }
  } catch (error) {
      setShowErrorMessage(true);
      setMensagemErro(`Erro ao avançar a tarefa: ${error}`);
  } finally {
      setTimeout(() => {
          setShowSuccessMessage(false);
          onClose();
          window.location.reload(); // Recarrega a página após o fechamento do diálogo
      }, 3000);
      setIsLoading(false);
  }
};

const onRecede = async (id) => {
  setIsLoading(true);
  try {
      const response = await onAdvanceTask(id, getTaskStatusValue(status) - 1);

      if (response.id > 0) {
          setStatus(response.status); // Atualiza o status local
          setShowSuccessMessage(true);
          setMensagemSucesso(`A tarefa retornou para ${response.status} com sucesso!`);
      } else {
          throw new Error('Erro ao retroceder a tarefa');
      }
  } catch (error) {
      setShowErrorMessage(true);
      setMensagemErro(`Erro ao retroceder a tarefa: ${error}`);
  } finally {
      setTimeout(() => {
          setShowSuccessMessage(false);
          onClose();
          window.location.reload(); // Recarrega a página após o fechamento do diálogo
      }, 3000);
      setIsLoading(false);
  }
};


  if (!card) {
    return null; // Ou retorne um UI alternativo
  }
  console.log("eu estou aqui: " + taskType)
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

    
    <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                    <h2>Editar Tarefa</h2>
                    <FaTimes onClick={onClose} style={styles.closeIcon} />
                </div>
                <div style={styles.modalBody}>
                    <div style={styles.formGroup}>
                        <label>Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            style={styles.titleInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Descrição</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            style={styles.textarea}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Status</label>
                        <div style={styles.status}>{card.status}</div>
                    </div>
                    <div style={styles.formGroup}>
                        <label>Tipo de Tarefa</label>
                        <select
                            value={taskType}
                            onChange={(e) => setTaskType(e.target.value)}
                            style={styles.input}
                        >
                            <option value={tipoTarefa.DATA}>Por Data</option>
                            <option value={tipoTarefa.DIAS}>Por Dias</option>
                            <option value={tipoTarefa.LIVRE}>Livre</option>
                        </select>
                    </div>
                    
                    {taskType === tipoTarefa.DATA && (
                        <div style={styles.formGroup}>
                            <label>Data de Término</label>
                            <input
                                type="date"
                                value={card.data_fim || ''}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    )}
                    {taskType === tipoTarefa.DIAS && (
                        <div style={styles.formGroup}>
                            <label>Dias para Completar</label>
                            <input
                                type="number"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    )}
                    <div style={styles.formGroup}>
                        <label>Prioridade</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            style={styles.input}
                        >
                            <option value="">Selecione..</option>
                            <option value="ALTA">ALTA</option>
                            <option value="MEDIA">MEDIA</option>
                            <option value="BAIXA">BAIXA</option>
                        </select>
                    </div>
                    {showSuccessMessage && (
                        <div style={styles.successMessage}>
                            <FaCheckCircle style={styles.successIcon} />
                            <span>{mensagemSucesso}</span>
                        </div>
                    )}
                    {showErrorMessage && (
                        <div style={styles.errorMessage}>
                            {mensagemErro} + "Tente novamente!"
                        </div>
                    )}
                </div>
                <div style={styles.modalFooter}>
                    <button onClick={handleSubmit} style={styles.saveButton} disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Salvar'}
                    </button>
                    {getTaskStatusValue(card.status) === 0 && (
                        <button onClick={() => onAdvance(card.id)} style={styles.advanceButton}>
                            Avançar
                        </button>
                    )}

                    {getTaskStatusValue(card.status) === 1 && (
                        <div>
                            <button onClick={() => onRecede(card.id)} style={styles.recedeButton}>
                                Retroceder
                            </button>
                            <button onClick={() => onAdvance(card.id)} style={styles.advanceButton}>
                                Avançar
                            </button>
                        </div>
                    )}

                    {getTaskStatusValue(card.status) === 2 && (
                        <button onClick={() => onRecede(card.id)} style={styles.recedeButton}>
                            Retroceder
                        </button>
                    )}

                </div>
            </div>
        </div>
      </Dialog>
  );
};


const styles = {
  modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalContent: {
      background: '#fff',
      padding: '30px',
      borderRadius: '10px',
      width: '600px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
      marginBottom: '20px',
  },
  closeIcon: {
      cursor: 'pointer',
  },
  modalBody: {
      marginBottom: '20px',
  },
  formGroup: {
      marginBottom: '20px',
  },
  titleInput: {
      width: '100%',
      padding: '10px 0',
      border: 'none',
      borderBottom: '1px solid #ccc',
      fontSize: '16px',
  },
  input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
  },
  textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      minHeight: '120px', 
      resize: 'none',
      boxSizing: 'border-box',
  },
  status: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#f4f4f4',
      borderRadius: '5px',
      border: '1px solid #ccc',
  },
  modalFooter: {
      display: 'flex',
      justifyContent: 'space-between',
  },
  saveButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
  },
  advanceButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#28a745',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
  },
  recedeButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#ffc107',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
  },
  successMessage: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '15px 20px',
      borderRadius: '5px',
      zIndex: '9999',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
  },
  successIcon: {
      fontSize: '24px',
      marginRight: '10px',
  },
  errorMessage: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#dc3545',
      color: '#fff',
      padding: '15px 20px',
      borderRadius: '5px',
      zIndex: '9999',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default EditTodo;
