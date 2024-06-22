
export interface ITodo {
    id: number;
    titulo: string;
    descricao: string;
    completo: boolean;
    createdAt : Date;
    data_fim : Date;
    prazo: number;
    tarefaLivre?: boolean;
    status : string;
    prioridade : string;
    tipoTask : string;
    taskLivre : boolean;
}

export enum StatusEnum {
    TAREFA = 'TAREFA',
    INICIALIZADA = 'INICIALIZADA',
    FINALIZADA = 'FINALIZADA',
}
