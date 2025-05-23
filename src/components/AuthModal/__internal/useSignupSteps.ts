import { useState } from 'react';
import * as yup from 'yup';
import { useSignupUser } from '@/api/signup';
import { useSignupTrainer } from '@/api/trainer';

export type Role = 'client' | 'trainer';

export const ROLE_OPTIONS = [
  { value: 'client', content: 'Клиент' },
  { value: 'trainer', content: 'Тренер' },
];

const signupSchema = yup.object().shape({
  email: yup.string().email('Некорректный email').required('Почта обязательна'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
  first_name: yup.string().required('Имя обязательно'),
  last_name: yup.string().required('Фамилия обязательна'),
  middle_name: yup.string()
});

const trainerSchema = yup.object().shape({
  email: yup.string().email('Некорректный email').required('Почта обязательна'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
  first_name: yup.string().required('Имя обязательно'),
  last_name: yup.string().required('Фамилия обязательна'),
  middle_name: yup.string(),
  description: yup.string().required('Описание обязательно'),
  experience_years: yup.number().min(0, 'Опыт не может быть отрицательным').required('Опыт обязателен'),
  profile_photo: yup.mixed().required('Фото обязательно'),
});

export const useSignupSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState<Role>('client');
  const [formData, setFormData] = useState<any>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    description: '',
    experience_years: '',
    profile_photo: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stepsClient = [
    { title: 'Роль' },
    { title: 'Почта и пароль' },
    { title: 'ФИО' },
  ];
  const stepsTrainer = [
    { title: 'Роль' },
    { title: 'Почта и пароль' },
    { title: 'ФИО' },
    { title: 'О себе' },
    { title: 'Фото' },
  ];
  const steps = role === 'trainer' ? stepsTrainer : stepsClient;

  const { mutate: registerUser, isPending: isSignupPending } = useSignupUser();
  const { mutate: registerTrainer, isPending: isTrainerPending } = useSignupTrainer();

  const validateStep = async () => {
    try {
      let fieldsToValidate: string[] = [];
      if (activeStep === 0) fieldsToValidate = ['role'];
      else if (activeStep === 1) fieldsToValidate = ['email', 'password'];
      else if (activeStep === 2) fieldsToValidate = ['first_name', 'last_name'];
      else if (role === 'trainer' && activeStep === 3) fieldsToValidate = ['description', 'experience_years'];
      else if (role === 'trainer' && activeStep === 4) fieldsToValidate = ['profile_photo'];

      let currentSchema;
      if (role === 'trainer') {
        currentSchema = yup.object().shape(
          Object.fromEntries(fieldsToValidate.map(field => [field, (trainerSchema as any).fields[field]]))
        );
      } else {
        currentSchema = yup.object().shape(
          Object.fromEntries(fieldsToValidate.map(field => [field, (signupSchema as any).fields[field]]))
        );
      }
      await currentSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const newErrors: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((e: any) => {
          newErrors[e.path] = e.message;
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  const handleNext = async (onSuccess?: () => void) => {
    setErrorMessage(null);
    const isValid = await validateStep();
    if (!isValid) return;
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      if (role === 'trainer') {
        registerTrainer({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          middle_name: formData.middle_name,
          description: formData.description,
          experience_years: Number(formData.experience_years),
          profile_photo: formData.profile_photo,
        }, {
          onError: () => setErrorMessage('Ошибка регистрации'),
          onSuccess: (response) => {
            localStorage.setItem('token', response.access_token);
            reset();
            if (onSuccess) onSuccess();
          },
        });
      } else {
        registerUser({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          middle_name: formData.middle_name,
        }, {
          onError: () => setErrorMessage('Ошибка регистрации'),
          onSuccess: (response) => {
            localStorage.setItem('token', response.access_token);
            reset();
            if (onSuccess) onSuccess();
          },
        });
      }
    }
  };

  const handlePrev = () => {
    setErrorMessage(null);
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleChange = (field: string) => (value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoChange = (file: File | null) => {
    setFormData((prev: any) => ({ ...prev, profile_photo: file }));
    if (errors['profile_photo']) {
      setErrors(prev => ({ ...prev, profile_photo: '' }));
    }
  };

  const reset = () => {
    setActiveStep(0);
    setRole('client');
    setFormData({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      description: '',
      experience_years: '',
      profile_photo: null,
    });
    setErrors({});
    setErrorMessage(null);
  };

  return {
    activeStep,
    setActiveStep,
    role,
    setRole,
    formData,
    setFormData,
    errors,
    setErrors,
    steps,
    isSignupPending,
    isTrainerPending,
    handleNext,
    handlePrev,
    handleChange,
    handlePhotoChange,
    reset,
    errorMessage,
    setErrorMessage,
  };
}; 