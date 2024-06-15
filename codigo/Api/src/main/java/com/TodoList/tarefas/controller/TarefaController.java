package com.TodoList.tarefas.controller;


import com.TodoList.tarefas.dto.result;
import com.TodoList.tarefas.interfaces.ITarefaService;
import com.TodoList.tarefas.models.Tarefa;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.TodoList.tarefas.enums.prioridadeEnum;
import com.TodoList.tarefas.enums.statusEnum;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "http://localhost:3000")
public class TarefaController {

    @Autowired
    ITarefaService tarefa_servico;


    @PostMapping
    @Operation(summary = "Salvar as tarefas da lista")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createTarefa(@RequestBody Tarefa tarefa) {
        result result;
        result = new result();
        Tarefa tarefa1 = tarefa_servico.createTarefa(tarefa, result);
        if(result.isErro())
            return ResponseEntity.badRequest().body(result.getErroMensage());
        return ResponseEntity.ok().body(tarefa1);
    }

    @GetMapping
    @Operation(summary = "Lista todas as tarefas da lista")
    @ResponseStatus(HttpStatus.OK)
    public List<Tarefa> getAllTarefa() {
        return tarefa_servico.listAllTarefa();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lista todas as tarefas da lista pelo Id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Tarefa> getTaskById(@PathVariable (value = "id") Long id) {
        return tarefa_servico.findTarefaById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar todas as tarefas da lista")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<? extends Object> updateTarefaById(@PathVariable (value = "id") Long id, @RequestBody Tarefa tarefa) {
        var result = new result();
        var tarefa1 =  tarefa_servico.updateTarefaById(id, tarefa, result);
        if(result.isErro())
            return ResponseEntity.badRequest().body(result.getErroMensage());
        return tarefa1;
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar todas as tarefas da lista")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteTaskById(@PathVariable (value = "id") Long id) {
        return tarefa_servico.deleteTarefaById(id);
    }

    // versionamento de código
    @PostMapping("/v1")
    @Operation(summary = "Salvar as tarefas da lista")
    public ResponseEntity createTarefav1(@RequestBody Tarefa tarefa) {
        result result;
        result = new result();
        Tarefa tarefa1 = tarefa_servico.createTarefa(tarefa, result);
        if(result.isErro())
            return ResponseEntity.badRequest().body(result.getErroMensage());
        return ResponseEntity.ok().body(tarefa1);
    }

    @GetMapping("/v1")
    @Operation(summary = "Lista todas as tarefas da lista")
    @ResponseStatus(HttpStatus.OK)
    public List<Tarefa> getAllTasksv1() {
        return tarefa_servico.listAllTarefa();
    }

    @GetMapping("/v1/{id}")
    @Operation(summary = "Lista todas as tarefas da lista pelo Id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Tarefa> getTarefaByIdv1(@PathVariable (value = "id") Long id) {
        return tarefa_servico.findTarefaById(id);
    }

    @PutMapping("/v1/{id}")
    @Operation(summary = "Editar todas as tarefas da lista")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<? extends Object> updateTarefaByIdV1(@PathVariable (value = "id") Long id, @RequestBody Tarefa tarefa) {
        var result = new result();
        var tarefa1 =  tarefa_servico.updateTarefaById(id, tarefa, result);
        if(result.isErro())
            return ResponseEntity.badRequest().body(result.getErroMensage());
        return tarefa1;
    }

    @DeleteMapping("/v1/{id}")
    @Operation(summary = "Deletar todas as tarefas da lista")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteTarefaByIdv1(@PathVariable (value = "id") Long id) {
        return tarefa_servico.deleteTarefaById(id);
    }
    @PatchMapping("/v1/status/{id}/{status}")
    public ResponseEntity<Tarefa> setStatus(@PathVariable long id,  @PathVariable int value){
        return tarefa_servico.setStatus(id, statusEnum.getStatusById(value));
    }
    @PatchMapping("/v1/prioridade/{id}/{status}")
    public ResponseEntity<Tarefa> alterarPrioridade(@PathVariable long id, @PathVariable int value){
        return tarefa_servico.alterarPrioridade(id, prioridadeEnum.getStatusById(value));
    }
}
