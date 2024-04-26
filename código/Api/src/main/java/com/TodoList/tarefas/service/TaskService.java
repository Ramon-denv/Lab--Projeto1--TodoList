package com.TodoList.tarefas.service;
import com.TodoList.tarefas.enums.prioridadeEnum;
import com.TodoList.tarefas.enums.statusEnum;
import com.TodoList.tarefas.models.Task;
import com.TodoList.tarefas.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask (Task task){
        return taskRepository.save(task);
    }

    public List<Task> listAllTasks(){
        return taskRepository.findAll();
    }

    public ResponseEntity<Task> findTaskById(Long id){
        var task1 = taskRepository.findById(id).orElse(null);
        task1.setCreatedAt(LocalDate.now());
        return  taskRepository.findById(id)
                .map(task -> ResponseEntity.ok().body(task))
                .orElse(ResponseEntity.notFound().build());
    }
    public ResponseEntity<Task> updateTaskById(Task task, Long id){
        return taskRepository.findById(id)
                .map(taskToUpdate ->{
                    taskToUpdate.setTitulo(task.getTitulo());
                    taskToUpdate.setDescricao(task.getDescricao());
                    taskToUpdate.setData_fim(task.getData_fim());
                    Task updated = taskRepository.save(taskToUpdate);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Object> deleteById (Long id){
        return taskRepository.findById(id)
                .map(taskToDelete ->{
                    taskRepository.deleteById(id);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());

    }

    public ResponseEntity<Task> setStatus(long id, statusEnum statusById) {
        return taskRepository.findById(id).map(taskToUpdate ->{
            taskToUpdate.setStatus(statusById);
            Task updated = taskRepository.save(taskToUpdate);
            return ResponseEntity.ok().body(updated);
        }).orElse(ResponseEntity.notFound().build());
    }
    public ResponseEntity<Task> alterarPrioridade(long id, prioridadeEnum prioridade){
        return taskRepository.findById(id).map(taskToUpdate ->{
            taskToUpdate.setPrioridade(prioridade);
            Task updated = taskRepository.save(taskToUpdate);
            return ResponseEntity.ok().body(updated);
        }).orElse(ResponseEntity.notFound().build());
    }
}
