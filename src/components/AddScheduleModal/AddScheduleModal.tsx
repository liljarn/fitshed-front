import { Button, Modal, TextInput, Text, TextArea } from '@gravity-ui/uikit';
import { useState, useRef, useEffect } from 'react';
import * as yup from 'yup';
import IMask from 'imask';
import './AddScheduleModal.scss';
import { useCreateSchedule } from '@/api/schedules/createSchedule';
import { useQueryClient } from 'react-query';

interface AddScheduleModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

interface AddScheduleFormData {
    title: string;
    description: string;
    datetime: string;
    address: string;
}

const schema = yup.object().shape({
    title: yup.string().required('Введите название тренировки'),
    description: yup.string().required('Введите описание тренировки'),
    datetime: yup
        .string()
        .required('Введите дату и время')
        .matches(
            /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
            'Формат даты и времени: ДД.ММ.ГГГГ ЧЧ:ММ'
        )
        .test('is-future', 'Дата должна быть в будущем', (value) => {
            if (!value) return false;
            const [date, time] = value.split(' ');
            const [day, month, year] = date.split('.');
            const [hours, minutes] = time.split(':');
            const inputDate = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day),
                parseInt(hours),
                parseInt(minutes)
            );
            return inputDate > new Date();
        }),
    address: yup.string().required('Введите адрес тренировки'),
});

interface MaskedInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    label?: string;
}

const MaskedInput = ({ value, onChange, error, placeholder, label }: MaskedInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const maskRef = useRef<ReturnType<typeof IMask>>();

    useEffect(() => {
        if (!inputRef.current) return;

        maskRef.current = IMask(inputRef.current, {
            mask: '00.00.0000 00:00',
            lazy: false,
            placeholderChar: '_',
            definitions: {
                '0': { mask: '0', placeholderChar: '_' }
            }
        });

        maskRef.current.on('accept', () => {
            onChange(maskRef.current!.value);
        });

        return () => {
            maskRef.current?.destroy();
        };
    }, []);

    useEffect(() => {
        if (maskRef.current && value !== maskRef.current.value) {
            maskRef.current.value = value;
        }
    }, [value]);

    return (
        <TextInput
            size="xl"
            label={label}
            error={error}
            placeholder={placeholder}
            controlRef={inputRef}
        />
    );
};

export const AddScheduleModal = ({ open, onClose, onSuccess }: AddScheduleModalProps) => {
    const [formData, setFormData] = useState<AddScheduleFormData>({
        title: '',
        description: '',
        datetime: '',
        address: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const createSchedule = useCreateSchedule();

    const handleChange = (field: keyof AddScheduleFormData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = async () => {
        try {
            await schema.validate(formData, { abortEarly: false });
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

    const handleSubmit = async () => {
        setErrorMessage(null);
        const isValid = await validateForm();
        if (!isValid) return;

        try {
            const [date, time] = formData.datetime.split(' ');
            const [day, month, year] = date.split('.');
            const [hours, minutes] = time.split(':');
            
            // Создаем дату в локальном времени для проверки
            const localDate = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day),
                parseInt(hours),
                parseInt(minutes)
            );

            // Проверяем, что дата в будущем
            if (localDate <= new Date()) {
                setErrors(prev => ({ ...prev, datetime: 'Дата должна быть в будущем' }));
                return;
            }

            // Конвертируем локальное время в UTC с учетом часового пояса пользователя
            const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

            await createSchedule.mutateAsync({
                title: formData.title,
                description: formData.description,
                datetime: utcDate.toISOString(),
                address: formData.address,
            }, {
                onSuccess: () => {
                    onClose();
                    onSuccess?.();
                },
                onError: () => {
                    setErrorMessage('Произошла ошибка при создании тренировки');
                }
            });
        } catch (err) {
            setErrorMessage('Произошла ошибка при создании тренировки');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="add-schedule-modal">
                <div className="add-schedule-modal__header">
                    <Text variant='display-1'>Добавить тренировку</Text>
                </div>
                <div className="add-schedule-modal__body">
                    <div className="add-schedule-modal__form">
                        <TextInput
                            size="xl"
                            label="Название"
                            value={formData.title}
                            onChange={(e) => handleChange('title')(e.target.value)}
                            error={errors.title}
                            placeholder="Введите название тренировки"
                        />
                        <MaskedInput
                            label="Дата и время"
                            value={formData.datetime}
                            onChange={(value) => handleChange('datetime')(value)}
                            error={errors.datetime}
                            placeholder="ДД.ММ.ГГГГ ЧЧ:ММ"
                        />
                        <TextInput
                            size="xl"
                            label="Адрес"
                            value={formData.address}
                            onChange={(e) => handleChange('address')(e.target.value)}
                            error={errors.address}
                            placeholder="Введите адрес тренировки"
                        />
                        <TextArea
                            size="xl"
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleChange('description')(e.target.value)}
                            error={errors.description}
                            placeholder="Добавьте описание тренировки"
                        />
                        {errorMessage && <div className="add-schedule-modal__error">{errorMessage}</div>}
                        <div className="add-schedule-modal__footer">
                            <Button size='xl' view="outlined" onClick={onClose}>
                                Отмена
                            </Button>
                            <Button 
                                size='xl'
                                view="action" 
                                onClick={handleSubmit}
                                loading={createSchedule.isPending}
                            >
                                Добавить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}; 