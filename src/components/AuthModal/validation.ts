import * as yup from 'yup';

export const schema = yup.object().shape({
    email: yup.string().email('Некорректный email').required('Почта обязательна'),
    password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
    first_name: yup.string().required('Имя обязательно'),
    last_name: yup.string().required('Фамилия обязательна'),
    middlename: yup.string()
}); 