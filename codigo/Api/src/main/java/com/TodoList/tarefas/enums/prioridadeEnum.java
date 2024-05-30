package com.TodoList.tarefas.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Arrays;

@Getter
@AllArgsConstructor
@NoArgsConstructor

public enum prioridadeEnum {
    ALTA (1, "Prioridade alta"),
    MEDIA (2, "Prioridade média"),
    BAIXA (3, "Prioridade baixa");

    private int id;
    private String descricao;

    public static prioridadeEnum getStatusById(int id){
        return Arrays.stream(values()).filter(x->x.id == id).findFirst().orElse(null);
    }

}