import { Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import block from 'bem-cn-lite';
import './TrainerCard.scss';

const b = block('trainerCard');

interface TrainerCardProps {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    photoUrl: string;
    experienceYears: number;
}

export const TrainerCard = ({ id, firstName, lastName, description, photoUrl, experienceYears }: TrainerCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/trainer/${id}`);
    };

    return (
        <div className={b()} onClick={handleClick}>
            <div className={b('photo')}>
                <img src={photoUrl} alt={`${firstName} ${lastName}`} />
            </div>
            <div className={b('content')}>
                <Text variant="header-2" className={b('name')}>
                    {`${firstName} ${lastName}`}
                </Text>
                <Text variant="body-1" className={b('experience')}>
                    Опыт работы: {experienceYears} лет
                </Text>
                <Text variant="body-1" className={b('description')}>
                    {description}
                </Text>
            </div>
        </div>
    );
}; 