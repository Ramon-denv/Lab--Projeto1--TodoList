package com.TodoList.tarefas.interfaces;

import com.TodoList.tarefas.dto.result;
import com.TodoList.tarefas.enums.prioridadeEnum;
import com.TodoList.tarefas.enums.statusEnum;
import com.TodoList.tarefas.models.Tarefa;
import com.TodoList.tarefas.repository.TarefaRepository;
import com.TodoList.tarefas.service.TarefaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DataJpaTest
@ActiveProfiles("test")
class ITarefaServiceTest {

    @Mock
    private TarefaRepository tarefaRepository;

    @InjectMocks
    private TarefaService tarefaService;

    @BeforeEach
    void setUp() {
        tarefa = new Tarefa("Test Task", "Description", false, statusEnum.TAREFA, false, 1, prioridadeEnum.BAIXA);
    }

    private Tarefa tarefa;
    @Test
    void createTarefa() {
        when(tarefaRepository.save(tarefa)).thenReturn(tarefa);
        result res = new result();
        Tarefa createdTarefa = tarefaService.createTarefa(tarefa, res);

        assertNotNull(createdTarefa);
        assertEquals(tarefa.getTitulo(), createdTarefa.getTitulo());
        verify(tarefaRepository, times(1)).save(tarefa);
    }

    @Test
    void listAllTarefa() {
        tarefaService.listAllTarefa();
        verify(tarefaRepository, times(1)).findAll();
    }

    @Test
    void findTarefaById() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        ResponseEntity<Tarefa> foundTarefa = tarefaService.findTarefaById(1L);

        assertNotNull(foundTarefa.getBody());
        assertEquals(tarefa.getTitulo(), foundTarefa.getBody().getTitulo());
        verify(tarefaRepository, times(1)).findById(1L);
    }

    @Test
    void updateTarefaById() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        when(tarefaRepository.save(tarefa)).thenReturn(tarefa);

        result res = new result();
        Tarefa updatedTarefa = new Tarefa("Updated Task", "Updated Description",true, statusEnum.TAREFA, true, 2, prioridadeEnum.BAIXA);
        Tarefa resultTarefa = tarefaService.updateTarefaById(1L, updatedTarefa, res).getBody();

        assertNotNull(resultTarefa);
        assertEquals(updatedTarefa.getTitulo(), resultTarefa.getTitulo());
        verify(tarefaRepository, times(1)).findById(1L);
        verify(tarefaRepository, times(1)).save(tarefa);
    }

    @Test
    void deleteTarefaById() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        doNothing().when(tarefaRepository).deleteById(1L);

        tarefaService.deleteTarefaById(1L);
        verify(tarefaRepository, times(1)).findById(1L);
        verify(tarefaRepository, times(1)).deleteById(1L);
    }

    @Test
    void setStatus() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        when(tarefaRepository.save(tarefa)).thenReturn(tarefa);

        ResponseEntity<Tarefa> response = tarefaService.setStatus(1L, statusEnum.INICIALIZADA);

        assertEquals(statusEnum.INICIALIZADA, response.getBody().getStatus());
        verify(tarefaRepository, times(1)).findById(1L);
        verify(tarefaRepository, times(1)).save(tarefa);
    }

    @Test
    void alterarPrioridade() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        when(tarefaRepository.save(tarefa)).thenReturn(tarefa);

        ResponseEntity<Tarefa> response = tarefaService.alterarPrioridade(1L, prioridadeEnum.ALTA);

        assertEquals(prioridadeEnum.ALTA, response.getBody().getPrioridade());
        verify(tarefaRepository, times(1)).findById(1L);
        verify(tarefaRepository, times(1)).save(tarefa);
    }
}