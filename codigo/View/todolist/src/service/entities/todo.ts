export interface ITodo {
    id: number;
    titulo: string;
    descricao: string;
    completo: boolean;
    createdAt : Date;
    dataFim : Date;
    prazo: number;
    tarefaLivre?: boolean;
    status : string;
    prioridade : string;
    tipoTarefa : string;
    taskLivre : boolean;
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
