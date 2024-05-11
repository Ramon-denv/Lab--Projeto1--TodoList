package com.TodoList.tarefas.service;
import com.TodoList.tarefas.dto.result;
import com.TodoList.tarefas.enums.prioridadeEnum;
import com.TodoList.tarefas.enums.statusEnum;
import com.TodoList.tarefas.interfaces.ITarefaService;
import com.TodoList.tarefas.models.Tarefa;
import com.TodoList.tarefas.repository.TarefaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TarefaService implements ITarefaService {

    private final TarefaRepository tarefaRepository;

    @Override
    public Tarefa createTarefa(Tarefa tarefa, result result) {
        tarefa.setCreatedAt(LocalDate.now());
        if (tarefa.isTarefaLivre()) {
            if (validaParametros(tarefa, result))
                return null;
        } else if (tarefa.getPrazo() > 0) {
            tarefa.setData_fim(LocalDate.now().plusDays(tarefa.getPrazo()));
        } else {
            if (validaDataFim(tarefa, result)) {
                return null;
            }
        }
        return tarefaRepository.save(tarefa);
    }
    @Override
    public List<Tarefa> listAllTarefa() {
        return tarefaRepository.findAll();
    }

    @Override
    public ResponseEntity<Tarefa> findTarefaById(Long id){
        return  tarefaRepository.findById(id)
                .map(task -> ResponseEntity.ok().body(task))
                .orElse(ResponseEntity.notFound().build());
    }
    @Override
    public ResponseEntity<Tarefa> updateTarefaById(long id, Tarefa tarefa, result result) {
        if(tarefa.isTarefaLivre()){
            if(validaParametros(tarefa, result))
                return null;
        }else if(tarefa.getPrazo() > 0 ){
            tarefa.setData_fim(LocalDate.now().plusDays(tarefa.getPrazo()));
        }else {
            if (validaDataFim(tarefa, result)){
                return null;
            }
        }
        return tarefaRepository.findById(id)
                .map(tarefaToUpdate -> {
                    tarefaToUpdate.setTitulo(tarefa.getTitulo());
                    tarefaToUpdate.setDescricao(tarefa.getDescricao());
                    tarefaToUpdate.setData_fim(tarefa.getData_fim());
                    tarefaToUpdate.setStatus(tarefa.getStatus());
                    tarefaToUpdate.setCreatedAt(tarefa.getCreatedAt());
                    tarefaToUpdate.setCompleto(tarefa.getCompleto());
                    tarefaToUpdate.setTarefaLivre(tarefa.isTarefaLivre());
                    tarefaToUpdate.setPrazo(tarefa.getPrazo());
                    tarefaToUpdate.setPrioridade(tarefa.getPrioridade());
                    Tarefa updated = tarefaRepository.save(tarefaToUpdate);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.ok().body(tarefaRepository.save(tarefa)));
    }
    @Override
    public ResponseEntity<Object> deleteTarefaById(Long id) {
        return tarefaRepository.findById(id)
                .map(tarefaToDelete -> {
                    tarefaRepository.deleteById(id);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());

    }
    @Override
    public ResponseEntity<Tarefa> setStatus(long id, statusEnum statusById) {
        return tarefaRepository.findById(id).map(tarefaToUpdate -> {
            tarefaToUpdate.setStatus(statusById);
            Tarefa updated = tarefaRepository.save(tarefaToUpdate);
            return ResponseEntity.ok().body(updated);
        }).orElse(ResponseEntity.notFound().build());
    }
    @Override
    public ResponseEntity<Tarefa> alterarPrioridade(long id, prioridadeEnum prioridade) {
        return tarefaRepository.findById(id).map(tarefaToUpdate -> {
            tarefaToUpdate.setPrioridade(prioridade);
            Tarefa updated = tarefaRepository.save(tarefaToUpdate);
            return ResponseEntity.ok().body(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    private boolean validaParametros(Tarefa tarefa, result result) {
        if (tarefa.getPrazo() > 0) {
            result.setErro(true);
            result.setErroMensage("Não é possível informar um prazo para uma task livre.");
            return false;
        }
        if (tarefa.getData_fim() != null) {
            result.setErro(true);
            result.setErroMensage("Não é possível informar data para finalizar uma task livre.");
            return false;
        }
        return true;
    }


    private boolean validaDataFim(Tarefa tarefa, result result) {
        LocalDate dataFim = tarefa.getData_fim();
        if (dataFim != null && dataFim.isBefore(LocalDate.now())) {
            result.setErro(true);
            result.setErroMensage("A data de finalização da tarefa deve ser maior que a data de hoje.");
            return false;
        } else
            return true;
    }
}
