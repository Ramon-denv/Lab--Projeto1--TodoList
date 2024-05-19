package com.TodoList.tarefas.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import com.TodoList.tarefas.enums.prioridadeEnum;
import com.TodoList.tarefas.enums.statusEnum;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Entity
@Table(name = "tarefas")
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Schema(description = "Todos os detalhes sobre uma tarefa. ")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @Schema(name = "Descrição da tarefa deve possuir pelo menos 10 caracteres")
    @Size(min = 10, message = "Descrição da tarefa deve possuir pelo menos 10 caracteres")

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private LocalDate data_fim;

    @Column(name = "completo")
    private boolean completo = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDate createdAt;

    @Column(name = "Status")
    @Enumerated(EnumType.ORDINAL)
    private statusEnum status;

    @Column(name = "isTaskLivre")
    private boolean isTarefaLivre;

    @Column(name = "prazo")
    private int prazo;

    @Column(name = "prioridade")
    @Enumerated(EnumType.ORDINAL)
    private prioridadeEnum prioridade;

    public Tarefa(String titulo, String descricao, LocalDate data_fim, boolean completo, statusEnum status, boolean isTarefaLivre, int prazo, prioridadeEnum prioridade) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.data_fim = data_fim;
        this.completo = completo;
        this.status = status;
        this.isTarefaLivre = isTarefaLivre;
        this.prazo = prazo;
        this.prioridade = prioridade;
    }

    public boolean getCompleto(){
        return completo;
    }


}

