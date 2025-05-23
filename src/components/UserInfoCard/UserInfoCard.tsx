import { Text } from '@gravity-ui/uikit';
import { User } from '@/api/user/getMe';
import block from 'bem-cn-lite';
import './UserInfoCard.scss';

const b = block('userInfoCard');

interface UserInfoCardProps {
    user: User;
}

export const UserInfoCard = ({ user }: UserInfoCardProps) => {
    const getEmoji = () => {
        return user.is_coach ? '💪' : '🎯';
    };

    return (
        <div className={b()}>
            <div className={b('header')}>
                <div className={b('emoji')}>
                    {getEmoji()}
                </div>
                <Text variant="display-1" className={b('title')}>
                    {`${user.last_name} ${user.first_name} ${user.middle_name || ''}`}
                </Text>
            </div>
            <div className={b('content')}>
                <div className={b('field')}>
                    <Text variant="body-1" className={b('label')}>
                        Email:
                    </Text>
                    <Text variant="body-1" className={b('value')}>
                        {user.email}
                    </Text>
                </div>
                <div className={b('field')}>
                    <Text variant="body-1" className={b('label')}>
                        Имя:
                    </Text>
                    <Text variant="body-1" className={b('value')}>
                        {user.first_name}
                    </Text>
                </div>
                <div className={b('field')}>
                    <Text variant="body-1" className={b('label')}>
                        Фамилия:
                    </Text>
                    <Text variant="body-1" className={b('value')}>
                        {user.last_name}
                    </Text>
                </div>
                <div className={b('field')}>
                    <Text variant="body-1" className={b('label')}>
                        Отчество:
                    </Text>
                    <Text variant="body-1" className={b('value')}>
                        {user.middle_name || '—'}
                    </Text>
                </div>
                <div className={b('field')}>
                    <Text variant="body-1" className={b('label')}>
                        Роль:
                    </Text>
                    <Text variant="body-1" className={b('value')}>
                        {user.is_coach ? 'Тренер' : 'Клиент'}
                    </Text>
                </div>
            </div>
        </div>
    );
}; 