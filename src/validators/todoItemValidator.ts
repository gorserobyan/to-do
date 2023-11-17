import * as yup from "yup";

export const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    deadline: yup.string(),
});