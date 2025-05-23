import { TrainersList } from '@/components/TrainersList';
import { useGetCoaches } from '@/api/trainer/getCoaches';
import { Loader, Text } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import './CoachesPage.scss';

const b = block('coachesPage');

export const CoachesPage = () => {
    const { data, isLoading, error } = useGetCoaches();

    if (isLoading) {
        return (
            <div className={b('loader')}>
                <Loader size="l" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={b('error')}>
                Произошла ошибка при загрузке списка тренеров
            </div>
        );
    }

    const trainers = data?.coaches.map(coach => ({
        id: coach.id,
        firstName: coach.first_name,
        lastName: coach.last_name,
        middleName: coach.middle_name,
        experienceYears: coach.experience_years,
        description: coach.description,
        photoUrl: coach.profile_photo_url,
    })) || [];

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Text variant="display-2" className={b('title')}>
                    Наши тренеры 💪
                </Text>
                <Text variant="body-2" className={b('description')}>
                    Выбирайте профессиональных тренеров, которые помогут вам достичь ваших целей в фитнесе! 
                    Подписывайтесь на тренировки и начните свой путь к здоровому образу жизни уже сегодня ✨
                </Text>
            </div>
            <TrainersList trainers={trainers} />
        </div>
    );
};
