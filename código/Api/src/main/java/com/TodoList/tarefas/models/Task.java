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
import java.util.Date;

@Entity
@Table(name = "tasks")
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Schema(description = "Todos os detalhes sobre uma tarefa. ")
public class Task {

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
    private boolean isTaskLivre;

    @Column(name = "prazo")
    private int prazo;

    @Column(name = "prioridade")
    @Enumerated(EnumType.ORDINAL)
    private prioridadeEnum prioridade;

    public boolean getCompleto(){
        return completo;
    }

}

