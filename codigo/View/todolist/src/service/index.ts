import axios, { AxiosInstance } from "axios";
import { ITodo } from "./entities/todo";

function setHttpServer(): AxiosInstance {
    return axios.create({
        baseURL: "https://lab-projeto1-todolist.onrender.com",
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
    const { data } = await setHttpServer().post(
        `/tarefas/v1`, task
    );
    return data;
}
export const onAdvanceTask = async (
    id : number,
    status : number
): Promise<any> => {
    const { data } = await setHttpServer().put(
        `/tarefas/v1/status/${id}/${status}`);
    return data;
}

export const editTodo = async (id: number, formData: ITodo): Promise<void> => {
    try {
        debugger
        const url = `/tarefas/v1/${id}`;
        const response = await setHttpServer().put(url, formData);
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