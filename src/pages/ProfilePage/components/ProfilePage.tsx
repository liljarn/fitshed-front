import { Button, Text } from '@gravity-ui/uikit';
import { useState } from 'react';
import './ProfilePage.scss';
import { UserInfoCard } from '@/components/UserInfoCard/UserInfoCard';
import { ScheduleList } from '@/components/ScheduleList/ScheduleList';
import { AddScheduleModal } from '@/components/AddScheduleModal/AddScheduleModal';
import { useGetMe } from '@/api/user/getMe';
import { useGetSchedules } from '@/api/schedule/getSchedules';

export const ProfilePage = () => {
    const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
    const { data: user, isLoading, error } = useGetMe();
    const { data: schedulesData, isLoading: isSchedulesLoading } = useGetSchedules();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error || !user) {
        return <div>Ошибка загрузки данных пользователя</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-page__header">
                <Text variant='display-3'>Мой профиль</Text>
                {user.is_coach && (
                    <Button
                        view="action"
                        size='xl'
                        onClick={() => setIsAddScheduleModalOpen(true)}
                    >
                        Добавить тренировку
                    </Button>
                )}
            </div>

            <div className="profile-page__content">
                <UserInfoCard user={user} />

                <div className="profile-page__section">
                    <Text variant='header-2'>{user.is_coach ? 'Мои тренировки' : 'Доступные тренировки моих тренеров'}</Text>
                    <ScheduleList schedules={schedulesData?.schedules || []} isCoach={user.is_coach} />
                </div>
            </div>

            <AddScheduleModal
                open={isAddScheduleModalOpen}
                onClose={() => setIsAddScheduleModalOpen(false)}
            />
        </div>
    );
}; 