export type TodoItem = {
    id: number | null;
    key: number | null;
    title: string;
    status: string;
    description?: string;
    deadline?: string;
}

export type State = {
    todoList: TodoItem[];
    trashList: TodoItem[];
}

export type FormData = {
    title: string;
    description?: string;
    deadline?: string;
}

export type StateType = {
    toDo: State;
}


