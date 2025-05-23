import { Button, Text } from '@gravity-ui/uikit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScheduleCard.scss';
import { DeleteScheduleModal } from '../DeleteScheduleModal/DeleteScheduleModal';
import { Coach } from '@/api/trainer/getCoaches';

interface ScheduleCardProps {
    id: number;
    title: string;
    description: string;
    datetime: string;
    address: string;
    isCoach: boolean;
    coach?: Coach;
}

export const ScheduleCard = ({ id, title, description, datetime, address, isCoach, coach }: ScheduleCardProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteModalOpen(true);
    };

    const handleCloseDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const handleCardClick = () => {
        coach && navigate(`/trainer/${coach.id}`);
    };

    const formattedDate = new Date(datetime).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="schedule-card">
            <div className="schedule-card__content" onClick={handleCardClick}>
                <div className="schedule-card__header">
                    <Text variant='header-2'>🏋️‍♂️ {title}</Text>
                </div>
                <Text variant='body-2'>{description}</Text>
                <div className="schedule-card__divider" />
                <div className="schedule-card__details">
                    <div className="schedule-card__detail">
                        <span className="schedule-card__icon">🕒</span>
                        <Text variant='body-2'>{formattedDate}</Text>
                    </div>
                    <div className="schedule-card__detail">
                        <span className="schedule-card__icon">📍</span>
                        <Text variant='body-2'>{address}</Text>
                    </div>
                </div>
                {coach && (
                    <>
                        <div className="schedule-card__divider" />
                        <div className="schedule-card__detail">
                            <Text variant='body-2'>Тренер: {coach.first_name} {coach.last_name}</Text>
                        </div>
                    </>
                )}
            </div>
            {isCoach && (
                <Button className="schedule-card__delete" view="outlined-danger" onClick={handleDeleteClick}>
                    Удалить
                </Button>
            )}
            <DeleteScheduleModal
                open={isDeleteModalOpen}
                onClose={handleCloseDelete}
                scheduleId={id}
            />
        </div>
    );
}; 