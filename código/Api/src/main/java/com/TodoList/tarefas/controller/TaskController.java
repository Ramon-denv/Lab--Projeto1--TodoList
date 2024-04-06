package com.TodoList.tarefas.controller;


import com.TodoList.tarefas.models.Task;
import com.TodoList.tarefas.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    TaskService taskService;


    @PostMapping
    @Operation(summary = "Salvar as tarefas da lista")
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    @Operation(summary = "Lista todas as tarefas da lista")
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getAllTasks() {
        return taskService.listAllTasks();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lista todas as tarefas da lista pelo Id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> getTaskById(@PathVariable (value = "id") Long id) {
        return taskService.findTaskById(id);
    }
    @PutMapping("/{id}")
    @Operation(summary = "Editar todas as tarefas da lista")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> updateTaskById(@PathVariable (value = "id") Long id, @RequestBody Task task) {
        return taskService.updateTaskById(task,id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar todas as tarefas da lista")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteTaskById(@PathVariable (value = "id") Long id) {
        return taskService.deleteById(id);
    }



}
