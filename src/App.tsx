import React from "react";
import AddTodo from "./components/AddTodo";
import { Tabs } from "antd";
import DeletedTodo from "./components/DeletedTodo";

const items = [
    {
        key: "1",
        label: "Todo List",
        children: <AddTodo />,
    },
    {
        key: "2",
        label: "Deleted Todos",
        children: <DeletedTodo/>,
    },
];

function App() {
    return (
    <div className="todo-content p-24">
        <Tabs
            defaultActiveKey="1"
            items={items}
            indicatorSize={(origin) => origin - 16}
        />
    </div>
  );
}

export default App;
