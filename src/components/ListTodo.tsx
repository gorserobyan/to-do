import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToDo, editTodo, completeTodo } from "../reducers/toDoSlider";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillEdit, AiOutlineCloseCircle, AiOutlineCheck } from "react-icons/ai";
import { Button, Input, Space, Table, Modal } from "antd";
import { TodoItem, StateType } from "../types/types";
import { schema } from "../validators/todoItemValidator";

const { Column } = Table;

const ListTodo = () => {
    const { TextArea } = Input;
    const { todoList } = useSelector((state: StateType) => state.toDo);
    const dispatch = useDispatch();
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [isEditing, setEditing] = useState(false);
    const [state, setState] = useState<TodoItem>({
        id: 0,
        key: 0,
        title: "",
        description: "",
        deadline: "",
        status: ""
    });

    const onEditToggle = (data: TodoItem) => {
        setEditing(true);
        setState(data);
    }

    const onSubmit: SubmitHandler<{ description?: string; deadline?: string; title: string }> = (data) => {
        const todoData: TodoItem = {
            id: state.id,
            key: state.key,
            status: state.status,
            ...data,
        };
        edit(todoData);
    };

    const edit = (data: TodoItem) => {
        dispatch(editTodo(data));
        setEditing(false);
        reset();
    };

    const handleModalClose = () => {
        setEditing(false);
        reset();
    }

    return (
        <div>
            {isEditing && (
                <Modal
                    centered
                    open={isEditing}
                    width={600}
                    footer={null}
                    onCancel={handleModalClose}
                >
                    <div className="todo-content">
                        <h2>Update your plan for today</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="form">
                            <div>
                                <label className="label">Title</label>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={state.title}
                                    render={({ field }) => (
                                        <Input className="mb-10" type="text" {...field} />
                                    )}
                                />
                                <div className="error">{errors.title?.message}</div>
                            </div>
                            <div>
                                <label className="label">Description</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue={state.description}
                                    render={({ field }) => (
                                        <TextArea className="mb-10" {...field} />
                                    )}
                                />
                            </div>
                            <div>
                                <label className="label">Deadline</label>
                                <Controller
                                    name="deadline"
                                    control={control}
                                    defaultValue={state.deadline}
                                    render={({ field }) => (
                                        <Input className="mb-10" type="date" {...field} />
                                    )}
                                />
                            </div>
                            <Button htmlType="submit" type="primary">
                                Edit
                            </Button>
                        </form>
                    </div>
                </Modal>
            )}
            <div className="table-responsive">
                <Table dataSource={todoList} pagination={false}>
                    <Column title="Title" dataIndex="title" key="title" />
                    <Column title="Description" dataIndex="description" key="description" />
                    <Column title="Deadline" dataIndex="deadline" key="deadline" />
                    <Column title="Status" dataIndex="status" key="status" />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, item: TodoItem) => (
                            <Space size="middle">
                                <AiOutlineCloseCircle onClick={() => dispatch(deleteToDo({ id: item.id }))} className="cursor-pointer"  />
                                <AiFillEdit onClick={() => onEditToggle(item)} className="cursor-pointer" />
                                <AiOutlineCheck onClick={() => dispatch(completeTodo({ id: item.id }))} className="cursor-pointer" />
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
};

export default ListTodo;
