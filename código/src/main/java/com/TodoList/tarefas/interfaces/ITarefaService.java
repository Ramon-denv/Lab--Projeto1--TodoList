package com.TodoList.tarefas.interfaces;

import com.TodoList.tarefas.dto.result;
import com.TodoList.tarefas.enums.prioridadeEnum;
import com.TodoList.tarefas.enums.statusEnum;
import com.TodoList.tarefas.models.Tarefa;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITarefaService {
    public Tarefa createTarefa(Tarefa tarefa, result result);
    public List<Tarefa> listAllTarefa();

    ResponseEntity<Tarefa> findTarefaById(Long id);

    public ResponseEntity<Tarefa> updateTarefaById(long id, Tarefa tarefa, result result);

    ResponseEntity<Object> deleteTarefaById(Long id);

    public ResponseEntity<Tarefa> setStatus(long id, statusEnum statusById);

    ResponseEntity<Tarefa> alterarPrioridade(long id, prioridadeEnum prioridade);

}
