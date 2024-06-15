export interface ITodo {
    id: number;
    titulo: string;
    descricao: string;
    completo: boolean;
    prazo: number;
    tarefaLivre?: boolean;
    status: StatusEnum;
    prioridade?: PrioridadeEnum;
}

export enum PrioridadeEnum {
    ALTA = 'ALTA',
    MEDIA = 'MEDIA',
    BAIXA = 'BAIXA',
}

export enum StatusEnum {
    TAREFA = 'TAREFA',
    INICIALIZADA = 'INICIALIZADA',
    FINALIZADA = 'FINALIZADA',
}
