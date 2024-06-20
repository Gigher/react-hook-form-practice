import * as yup from "yup";

export const formSchema = yup.object({
    Name: yup.string().required("Name is required").min(3, "Имя слишком короткое").max(12, "Имя слишком длинное"),
    Surname: yup.string().required("Surname is required").min(3, "Фамилия слишком короткое").max(12, "Фамилия слишком длинное"),
    Count: yup.number().min(9999, "Поле должно содержать 5-7 символов").max(1000000, "Поле должно содержать 5-7 символов"),
    Date: yup.date().typeError('Выберите корректную дату').min(new Date(), 'Дата не может быть меньше этого дня').when('number', (number, schema) => {return number ? schema.required('Поле обязательно') : schema}),
})