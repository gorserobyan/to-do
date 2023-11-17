import React from "react";
import { useSelector } from "react-redux";
import { StateType } from "../types/types";
import { Table } from "antd";

const { Column } = Table;

const DeletedTodo = () => {
    const { trashList } = useSelector((state: StateType) => state.toDo);

    return (
        <div className="table-responsive">
            <Table dataSource={trashList} pagination={false}>
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Description" dataIndex="description" key="description" />
                <Column title="Deadline" dataIndex="deadline" key="deadline" />
                <Column title="Status" dataIndex="status" key="status" />
            </Table>
        </div>
    )
}

export default DeletedTodo;