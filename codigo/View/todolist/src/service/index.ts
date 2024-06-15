import axios, { AxiosInstance } from "axios";
import { ITodo } from "./entities/todo";

function setHttpServer(): AxiosInstance {
    return axios.create({
        baseURL: "http://localhost:8080",
    });
}

export const getTodo = async (): Promise<ITodo[]> => {
    const response = await setHttpServer().get("/tarefas");
    return response.data;
};

export const AddTodo = async (formData: ITodo): Promise<void> => {
    try {
        debugger
        const url = `/tarefas`;
        console.log(formData);
        const response = await setHttpServer().post(url, formData);
        if (response.status === 200) {
            console.log("Tarefa salva com sucesso!");
            window.location.reload();
        } else {
            console.error("Erro ao salvar tarefa:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao salvar tarefa:", error);
        throw error;
    }
};

export const editTodo = async (id: number, formData: ITodo): Promise<void> => {
    try {
        debugger
        const url = `/tarefas/${id}`;
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

export const deleteTodo = async (id: number): Promise<void> => {
    try {
        const url = `/tarefas/${id}`;
        const response = await setHttpServer().delete(url);
        if (response.status === 200) {
            console.log("Tarefa deletada com sucesso!");
            window.location.reload();
        } else {
            console.error("Erro ao deletar tarefa:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        throw error;
    }
};