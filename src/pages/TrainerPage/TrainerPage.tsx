import { Button, Text, Toast } from '@gravity-ui/uikit';
import { useParams } from 'react-router-dom';
import block from 'bem-cn-lite';
import { useGetCoach } from '@/api/trainer/getCoach';
import { useCreateSubscription } from '@/api/subscriptions/createSubscription';
import { ScheduleList } from '@/components/ScheduleList/ScheduleList';
import './TrainerPage.scss';
import { useState } from 'react';
import { useDeleteSubscription } from '@/api/subscriptions/deleteSubscription';

const b = block('trainerPage');

export const TrainerPage = () => {
    const { id } = useParams();
    const { data: trainer, isLoading, error } = useGetCoach(Number(id));
    const createSubscription = useCreateSubscription();
    const deleteSubscription = useDeleteSubscription();

    const [subscriptionError, setSubscriptionError] = useState<string | null>(null);
    const [deleteSubscriptionError, setDeleteSubscriptionError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ title: string; content: string; theme: 'success' | 'danger' } | null>(null);

    const handleSubscribe = async () => {
        try {
            setSubscriptionError(null);
            await createSubscription.mutateAsync({ coach_id: Number(id) });
            setToast({
                title: 'Успешно! 🎉',
                content: 'Вы успешно подписались на тренировки',
                theme: 'success'
            });
        } catch (error) {
            setSubscriptionError('Ошибка подписки. Возможно, вы являетесь тренером или уже подписаны на этого тренера');
        }
    };

    const handleDeleteSubscribe = async () => {
        try {
            setSubscriptionError(null);
            await deleteSubscription.mutateAsync(Number(id));
            setToast({
                title: 'Готово! 👋',
                content: 'Вы успешно отписались от тренировок',
                theme: 'success'
            });
        } catch (error) {
            setDeleteSubscriptionError('Ошибка отписки. Возможно, вы не были подписаны на этого тренера');
        }
    };

    if (isLoading) {
        return (
            <div className={b('loading')}>
                <Text variant="header-1">Загрузка...</Text>
            </div>
        );
    }

    if (error || !trainer) {
        return (
            <div className={b('error')}>
                <Text variant="header-1" color="danger">
                    Ошибка при загрузке данных тренера
                </Text>
            </div>
        );
    }

    console.log(trainer);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <div className={b('photo')}>
                    <img src={trainer.profile_photo_url} alt={`${trainer.first_name} ${trainer.last_name}`} />
                </div>
                <div className={b('info')}>
                    <Text variant="display-3" className={b('name')}>
                        {`${trainer.first_name} ${trainer.last_name}`}
                    </Text>
                    <Text variant="header-1" className={b('specialization')}>
                        Персональный тренер
                    </Text>
                    <div className={b('stats')}>
                        <div className={b('stat')}>
                            <Text variant="header-2" className={b('statValue')}>
                                {trainer.experience_years}
                            </Text>
                            <Text variant="body-1" className={b('statLabel')}>
                                Лет опыта
                            </Text>
                        </div>
                    </div>
                    <Button 
                        view="action" 
                        size="xl" 
                        onClick={handleSubscribe}
                        className={b('subscribeButton')}
                        loading={createSubscription.isPending}
                    >
                        Подписаться на тренировки
                    </Button>
                    <Button 
                        view="outlined-danger"
                        size="xl" 
                        onClick={handleDeleteSubscribe}
                        className={b('subscribeButton')}
                        loading={deleteSubscription.isPending}
                    >
                        Отписаться от тренировок
                    </Button>
                    {subscriptionError && (
                        <Text variant="body-2" className={b('error')}>
                            {subscriptionError}
                        </Text>
                    )}
                    {deleteSubscriptionError && (
                        <Text variant="body-2" className={b('error')}>
                            {deleteSubscriptionError}
                        </Text>
                    )}
                </div>
            </div>
            {toast && (
                <Toast
                    name="subscription-toast"
                    title={toast.title}
                    content={toast.content}
                    theme={toast.theme}
                    onClose={() => setToast(null)}
                    autoHiding={5000}
                    removeCallback={() => setToast(null)}
                />
            )}
            <div className={b('content')}>
                <div className={b('section')}>
                    <Text variant="header-1" className={b('sectionTitle')}>
                        О тренере
                    </Text>
                    <Text variant="body-2" className={b('description')}>
                        {trainer.description}
                    </Text>
                </div>

                <div className={b('section')}>
                    <Text variant="header-1" className={b('sectionTitle')}>
                        Расписание тренировок
                    </Text>
                    <ScheduleList schedules={trainer.schedules} />
                </div>
            </div>
        </div>
    );
}; 