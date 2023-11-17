import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addToDo } from "../reducers/toDoSlider";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Input } from "antd";
import ListTodo from "./ListTodo";
import { FormData, TodoItem } from "../types/types";
import { schema } from "../validators/todoItemValidator";

const AddTodo = () => {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
      const addData = {
          ...data,
          status: "Pending",
          id: Math.floor(Math.random() * 10),
          key: Math.floor(Math.random() * 10)
      };
      add(addData);
  };

   const add = (data: TodoItem) => {
    dispatch(addToDo({ newContent: data }));
   }

    return (
        <>
            <Card>
                <h2>What's your plan for today</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <div>
                        <label className="label">Title</label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    className="mb-10"
                                    type="text"
                                    {...field}
                                />
                            }
                        />
                        <div className="error">{errors.title?.message}</div>
                    </div>

                    <div>
                        <label className="label">Description</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) =>
                                <TextArea
                                    className="mb-10"
                                    {...field}
                                />
                            }
                        />
                    </div>

                    <div>
                        <label className="label">Deadline</label>
                        <Controller
                            name="deadline"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    className="mb-10"
                                    type="date"
                                    {...field}
                                />
                            }
                        />
                    </div>
                    <Button htmlType="submit" type="primary">
                        Add Item
                    </Button>
                </form>
            </Card>
           <ListTodo />
        </>

    );
};

export default AddTodo;
