import axios, { AxiosInstance } from "axios";
import { ITodo } from "./entities/todo";

function setHttpServer(): AxiosInstance {
    return axios.create({
        baseURL: "http://localhost:8080",
    });
}

export const getTasks = async (): Promise<ITodo[]> => {
    
    const { data } = await setHttpServer().get(`/tarefas/v1`);
    return data;
};

export const getTasksByStatus = async (status: string): Promise<ITodo[]> => {

    const { data } = await setHttpServer().get(`/tarefas/v1/status/${status}`);
    return data;
};
export const postTask = async (
    task : any
): Promise<any> => {
    debugger
    console.log(task);
    const { data } = await setHttpServer().post(
        
        `/tarefas/v1`, task
    );
    return data;
}
export const onAdvanceTask = async (
    id : number,
    status : number
): Promise<any> => {
    debugger
    const { data } = await setHttpServer().put(
        `/tarefas/v1/status/${id}/${status}`);
    return data;
}

export const editTodo = async (Data: ITodo): Promise<void> => {
    try {
        debugger
        const url = `/tarefas/v1/${Data.id}`;
        const response = await setHttpServer().put(url, Data);
        if (response.status === 200) {
            console.log("Tarefa atualizada com sucesso!");
            window.location.reload();
        } else {
            console.error("Erro ao atualizar tarefa:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        throw error;
    }
};

export const deleteTasks = async (id : number): Promise<boolean> => {
    try{
        const { data } = await setHttpServer().delete(`/tarefas/v1/${id}`);
        return data;
    }catch (e) {
        return e.response.data;
    }
};