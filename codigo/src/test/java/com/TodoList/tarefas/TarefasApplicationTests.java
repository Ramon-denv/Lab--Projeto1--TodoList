package com.TodoList.tarefas;

import com.TodoList.tarefas.TarefasApplication;
import com.TodoList.tarefas.models.Tarefa;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.LocalDate;

import static com.TodoList.tarefas.enums.prioridadeEnum.BAIXA;
import static com.TodoList.tarefas.enums.statusEnum.TAREFA;

@SpringBootTest(classes = TarefasApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
@ActiveProfiles("test")
public class TarefasApplicationTests {

	@Autowired
	private WebTestClient webTestClient;

	@BeforeEach
	public void setup() {
		// Configurações adicionais, se necessárias
	}

	@Test
	void givenUrl_whenSuccessOnGetsResponseAndJsonHasRequiredKV_thenCorrect() {
		webTestClient.get()
				.uri("/tarefas")
				.exchange()
				.expectStatus().isOk();
	}

	@Test
	void givenUrl_whenSuccessOnGetsResponseAndJsonHasOneTask_thenCorrect() {
		var response = webTestClient.get()
				.uri("/tarefas/1")
				.exchange()
				.expectStatus().isOk()
				.expectBody(String.class)
				.returnResult()
				.getResponseBody();

		System.out.println("Response JSON: " + response);

		webTestClient.get()
				.uri("/tarefas/1")
				.exchange()
				.expectStatus().isOk()
				.expectBody()
				.jsonPath("$.titulo").isEqualTo("updated todo")
				.jsonPath("$.descricao").isEqualTo("updated description")
				.jsonPath("$.data_fim").isEqualTo("2024-05-19") // Ajuste aqui, se necessário, para o formato de data
				.jsonPath("$.completo").isEqualTo("true")
				.jsonPath("$.prioridade").isEqualTo("BAIXA") // Considerando que é um enum
				.jsonPath("$.status").isEqualTo("TAREFA");
	}

	@Test
	void testeCreateTodoSucesso() {
		var todo = new Tarefa("todo 1", "todo lista", LocalDate.of(2024, 5, 19), false, TAREFA, false, 1, BAIXA);

		webTestClient
				.post()
				.uri("/tarefas")
				.bodyValue(todo)
				.exchange()
				.expectStatus().isOk()
				.expectBody()
				.jsonPath("$.titulo").isEqualTo(todo.getTitulo())
				.jsonPath("$.descricao").isEqualTo(todo.getDescricao())
				.jsonPath("$.data_fim").isEqualTo(todo.getData_fim().toString())
				.jsonPath("$.completo").isEqualTo(todo.getCompleto())
				.jsonPath("$.prioridade").isEqualTo(todo.getPrioridade().toString())
				.jsonPath("$.status").isEqualTo(todo.getStatus().toString());
	}

	@Test
	void testeUpdateTodoSucesso() {
		var updatedTodo = new Tarefa("updated todo", "updated description", LocalDate.of(2024, 5, 19), true, TAREFA, false, 1, BAIXA);

		webTestClient
				.put()
				.uri("/tarefas/2")  // Assume que estamos atualizando a tarefa com ID 1
				.bodyValue(updatedTodo)
				.exchange()
				.expectStatus().isOk()
				.expectBody()
				.jsonPath("$.titulo").isEqualTo(updatedTodo.getTitulo())
				.jsonPath("$.descricao").isEqualTo(updatedTodo.getDescricao())
				.jsonPath("$.data_fim").isEqualTo(updatedTodo.getData_fim().toString()) // Ajuste aqui, se necessário, para o formato de data
				.jsonPath("$.completo").isEqualTo(updatedTodo.getCompleto())
				.jsonPath("$.prioridade").isEqualTo(updatedTodo.getPrioridade().toString()) // Considerando que é um enum
				.jsonPath("$.status").isEqualTo(updatedTodo.getStatus().toString()); // Considerando que é um enum
	}

}
